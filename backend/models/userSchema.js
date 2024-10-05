import mongoose from "mongoose";
import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";
import crypto from "crypto";

const userSchema = new mongoose.Schema({
    fullName:{
        type:String,
        required:[true, "Name is Required"]
    },
    email:{
        type:String,
        required:[true, "Email is Required"],
    },
    phone:{
        type:String,
        required:[true, "Phone Number is Required"],
    },
    aboutMe:{
        type:String,
        required:[true, "About Me Field is Required"]
    },
    password:{
        type:String,
        required:[true, "Password is Required"],
        minLenght:[8, "Password must contain at least 8 characters"],
        select: false
    },
    avatar:{
        public_id:{
            type:String,
            required:true,
        },
        url:{
            type:String,
            required:true,
        },  
    },
    resume:{
        public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        }
    },
    portfolioURL:{
        type:String,
        require: [true, "Portfolio URL is Required"]
    },
    githubURL: String,
    instagramURL: String,
    linkedinURL: String,
    twitterURL: String,
    facebookURL: String,
    youtubeURL: String,
    pinterestURL: String,
    resetPasswordToken: String,
    resetPasswordExpire: Date
});

//FOR HASHING PASSWORD
userSchema.pre("save", async function(next){
    if(!this.isModified("password")){
       return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    return next();
});

//FOR COMPARING PASSWORD WITH HASHED PASSWORD
userSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password);
};

//FOR GENERATING JSONWEBTOKEN
userSchema.methods.generateJsonWebToken = function(){
    return JWT.sign({id: this._id}, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRES
    });
};

//FOR RESET PASSWORD, IF USER/(ME) FORGOT THEIR PASSWORD {SEE THIS IN YOUR "userController.js"}
userSchema.methods.getResetPasswordToken = function(){
    const resetToken = crypto.randomBytes(20).toString('hex');

    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");

    this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;
    return resetToken;
}
export const User = mongoose.model("User", userSchema);