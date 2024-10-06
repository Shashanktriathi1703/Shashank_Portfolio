import { catchAsyncError } from "../middlewares/catchAsyncErrors.js";
import { Skill } from "../models/skillSchema.js";
import {v2 as cloudinary} from "cloudinary";
import ErrorHandler from "../middlewares/error.js";

export const addNewSkill = catchAsyncError(async(req, res, next) => {
    if(!req.files || Object.keys(req.files).length == 0){
        return next(new ErrorHandler("Skill Icon/Svg/Image Required...!📷", 400));
    }

    const {svg} = req.files;
    const {title, proficiency} = req.body;

    if(!title || !proficiency){
        return next(new ErrorHandler("Please fill all the details...📜🔊", 400));
    }

    const cloudinaryResponse = await cloudinary.uploader.upload(svg.tempFilePath, {
        folder: "PORTFOLIO_SKILL_SVGS"
    });

    if(!cloudinaryResponse || cloudinaryResponse.error){
        console.error( "Cloudinary Error:", cloudinaryResponse.error.message || "Unknown Cloudinary Error" );
    }

    const skill = await Skill.create({
        title,
        proficiency,
        svg:{
            public_id: cloudinaryResponse.public_id,
            url: cloudinaryResponse.secure_url
        }
    });
    res.status(200).json({
        success: true,
        message:"New Skill Added Successfully...!✅",
        skill
    })
});

export const deleteSkill = catchAsyncError(async(req, res, next) => {
    const {id} = req.params;
    const skill = await Skill.findById(id);
    if(!skill){
        return next(new ErrorHandler("Skill Not Found...!🧐", 404));
    }

    const skillSvgId = skill.svg.public_id;
    await cloudinary.uploader.destroy(skillSvgId);
    await skill.deleteOne();
    res.status(200).json({
        success: true,
        message: "Skill Deleted Successfully...!✅"
    });
});

export const updateSkill = catchAsyncError(async(req, res, next) => {
    const {id} = req.params;
    let skill = await Skill.findById(id);
    if(!skill){
        return next(new ErrorHandler("Skill Not Found...!🧐", 404));
    }

    const {proficiency} = req.body;
    skill = await Skill.findByIdAndUpdate(
        id, 
        { proficiency }, 
        {
            new: true,
            runValidators: true,
            useFindAndModify: false
        }
    );
    res.status(200).json({
        success: true,
        message: "Skill Updated Successfully...!✅",
        skill
    });
});

export const getAllSkills = catchAsyncError(async(req, res, next) => {
    const skills = await Skill.find();
    res.status(200).json({
        success: true,
        skills
    });
});