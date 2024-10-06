import {catchAsyncError} from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";
import { Message } from "../models/messageSchema.js";

export const sendMessage = catchAsyncError(async(req, res, next)=>{
    const{senderName, subject, message} = req.body;
    if(!senderName || !subject || !message ){
        return next(new ErrorHandler("Please fill all the fields", 400));
    }
    const data = await Message.create({
        senderName,
        subject,
        message
    });
    res.status(200).json({success: true, message:"Message Sent Successfully", data});
});

export const getAllMessage = catchAsyncError(async(req, res, next)=>{
    const messages = await Message.find();
    res.status(200).json({success: true, message:"All Messages", messages});
});

export const deleteMessage = catchAsyncError(async(req, res, next)=>{
    const {id} = req.params;
    const data = await Message.findById(id);
    if(!data){
        return next(new ErrorHandler("Message Already Deleted", 404));
    }
    await data.deleteOne();
    res.status(200).json({success: true, message:"Message Deleted"});
});