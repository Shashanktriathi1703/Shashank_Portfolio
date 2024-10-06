import {catchAsyncError} from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";
import { User } from "../models/userSchema.js";
import {v2 as cloudinary} from "cloudinary";
import { generateToken } from "../utils/jwtToken.js";
import { sendEmail } from "../utils/sendEmail.js";
import crypto from "crypto";

//******** REGISTRATION FOR USER ********
export const register = catchAsyncError(async(req, res, next)=>{
    if(!req.files || Object.keys(req.files).length == 0){
        return next(new ErrorHandler("Avatar and Resume are Required!", 400));
    }

    //***AVATAR KE LIYE***
    const {avatar} = req.files;
    // console.log("AVATAR", avatar);
    const cloudinaryResponseForAvatar = await cloudinary.uploader.upload(avatar.tempFilePath, {
        folder: "AVATARS"
    });

    if(!cloudinaryResponseForAvatar || cloudinaryResponseForAvatar.error){
        console.error( "Cloudinary Error:", cloudinaryResponseForAvatar.error.message || "Unknown Cloudinary Error" );
    }
    
    //***RESUME KE LIYE***
    const {resume} = req.files;
    // console.log("RESUME", resume);
    const cloudinaryResponseForResume = await cloudinary.uploader.upload(resume.tempFilePath, {
        folder: "ME_RESUME",
    });

    if(!cloudinaryResponseForResume || cloudinaryResponseForResume.error){
        console.error( "Cloudinary Error:", cloudinaryResponseForResume.error.message || "Unknown Cloudinary Error" );
    }

    const{fullName, email, phone, aboutMe, password, portfolioURL, githubURL, instagramURL, linkedinURL, twitterURL, facebookURL, youtubeURL, pinterestURL} = req.body;
    const user = await User.create({
        fullName,
        email,
        phone,
        aboutMe,
        password,
        portfolioURL,
        githubURL,
        instagramURL,
        linkedinURL,
        twitterURL,
        facebookURL,
        youtubeURL,
        pinterestURL,
        avatar: {
            public_id: cloudinaryResponseForAvatar.public_id,
            url: cloudinaryResponseForAvatar.secure_url
        },
        resume: {
            public_id: cloudinaryResponseForResume.public_id,
            url: cloudinaryResponseForResume.secure_url
        }
    });
    
    generateToken(user, "User Registered Successfully...✅", 201, res);

});

//******** LOGIN FOR USER/(ME) ********

export const login = catchAsyncError(async(req, res, next)=>{
    const {email, password} = req.body;
    console.log(email);
    console.log(password);
    if(!email || !password){
        return next(new ErrorHandler("Please provide both Email and Password!"));
    }
    const user = await User.findOne({email}).select("+password");
    if(!user){
        return next(new ErrorHandler("Invalid Email or Password!"));
    }

    const isPasswordMatched = await user.comparePassword(password);
    if(!isPasswordMatched){
        return next(new ErrorHandler("Invalid Email or Password!"));
    }
    generateToken(user, "Logged IN SUCCESSFULLY...✅", 200, res);
});

//******* LOGOUT FOR USER/(ME) *******
export const logout = catchAsyncError(async(req, res, next)=>{
    res.status(200).cookie("token", "", {
        expires: new Date(Date.now()),
        httpOnly: true
    }).json({
        success: true,
        message: "Logged Out Successfully...✅"
    })
});

//******** GETUSER/(ME) DETAILS ********
export const getUser = catchAsyncError(async(req, res, next)=>{
    const user = await User.findById(req.user.id);
    res.status(200).json({
        success: true,
        user
    });
});

//********* UPDATE THE USER/(ME) PROFILE *********
export const updateProfile = catchAsyncError(async(req, res, next)=>{
    const newUserData = {
        fullName: req.body.fullName,
        email: req.body.email,
        phone: req.body.phone,
        aboutMe: req.body.aboutMe,
        portfolioURL: req.body.portfolioURL,
        githubURL: req.body.githubURL,
        instagramURL: req.body.instagramURL,
        linkedinURL: req.body.linkedinURL,
        twitterURL: req.body.twitterURL,
        facebookURL: req.body.facebookURL,
        youtubeURL: req.body.youtubeURL,
        pinterestURL: req.body.pinterestURL,
    };
    console.log(newUserData);
    if(req.files && req.files.avatar){
        const avatar = req.files.avatar;
        const user = await User.findById(req.user.id);
        const profileImageID = user.avatar.public_id;
        await cloudinary.uploader.destroy(profileImageID);

        const cloudinaryResponse = await cloudinary.uploader.upload(avatar.tempFilePath, {
            folder: "AVATARS"
        });
        newUserData.avatar = {
            public_id: cloudinaryResponse.public_id,
            url: cloudinaryResponse.secure_url
        };
    }
    if(req.files && req.files.resume){
        const resume = req.files.resume;
        const user = await User.findById(req.user.id);
        const resumeID = user.resume.public_id;
        await cloudinary.uploader.destroy(resumeID);

        const cloudinaryResponse = await cloudinary.uploader.upload(resume.tempFilePath, {
            folder: "ME_RESUME"
        });
        newUserData.resume = {
            public_id: cloudinaryResponse.public_id,
            url: cloudinaryResponse.secure_url
        };
    }
    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });
    res.status(200).json({
        success: true,
        message: "Profile Updated Successfully...✅",
        user
    });
});

//******** UPDATE THE USER/(ME) PASSWORD ********
export const updatePassword = catchAsyncError(async(req, res, next)=>{
    const {currentPassword, newPassword, confirmNewPassword} = req.body;
    if(!currentPassword || !newPassword || !confirmNewPassword){
        return next(new ErrorHandler("All fields are required", 400));
    }
    const user = await User.findById(req.user.id).select("+password");
    const isPasswordMatched = await user.comparePassword(currentPassword);
    if(!isPasswordMatched){
        return next(new ErrorHandler("Incorrect Current Password", 400));
    }
    if(newPassword !== confirmNewPassword){
        return next(new ErrorHandler("New Password and Confirm New Password do not matched", 400));
    }
    user.password = newPassword;
    await user.save();
    res.status(200).json({
        success: true,
        message: "Password Updated Successfully...✅"
    });
});

//******** Anyone Can See MY Portfolio Without Registration and Login ********
export const getUserForPortfolio = catchAsyncError(async(req, res, next)=>{
    const id = "66de19817aa3067a3db178db";
    const user = await User.findById(id);
    res.status(200).json({
        success: true,
        user
    });
});

//******** When User/(Me) forgot Password, Then how to change their Password ********
export const forgotPassword = catchAsyncError(async(req, res, next)=>{
    const user  = await User.findOne({email: req.body.email});
    if(!user){
        return next(new ErrorHandler("User Not Found", 404));
    }
    const resetToken = user.getResetPasswordToken();
    await user.save({validateBeforeSave: false});
    const resetPasswordURL = `${process.env.DASHBOARD_URL}/password/reset/${resetToken}`;
    const message = `📧Your Reset Password Token is📧: \n\n ${resetPasswordURL} \n\n 🚫If you've not request for this please ignore it🚫:`;

    try{
        await sendEmail({
            email: user.email,
            subject: "🚀Personal Portfolio Dashboard Recovery Password🚀",
            message
        });
        res.status(200).json({
            success: true,
            message: `Email sent to ${user.email} Successfully...✅`
        });
    }catch(error){
        user.resetPasswordExpire = undefined;
        user.resetPasswordToken = undefined;
        await user.save();
        return next(new ErrorHandler(error.message, 500));
    }
});

//********* RESET PASSWORD ********
export const resetPassword = catchAsyncError(async(req, res, next)=>{
    const {token} = req.params;
    const resetPasswordToken = crypto.createHash("sha256").update(token).digest("hex");
    
    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() }
    });
    if(!user){
        return next(new ErrorHandler("❌❌❌Reset Password token is invalid or has been expired❌❌❌", 400));
    }
    if(req.body.password !== req.body.confirmPassword){
        return next(new ErrorHandler("❌❌❌Password & Confirm Password does not match❌❌❌", 400));
    }
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();
    generateToken(user, "Reset Passowrd Successfully...!✅", 200, res);
});