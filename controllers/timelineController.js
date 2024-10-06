import { catchAsyncError } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";
import { Timeline } from "../models/timelineSchema.js";

export const postTimeLine = catchAsyncError(async(req, res, next) => {
    const {title, description, from, to} = req.body;

    const newTimeline  = await Timeline.create({
        title,
        description,
        timeline:{from, to}
    });

    res.status(200).json({
        success: true,
        message: "Timeline Added Successfully...!🧬",
        newTimeline
    });
});

export const deleteTimeLine = catchAsyncError(async(req, res, next) => {
    const {id} = req.params;
    const timeline = await Timeline.findById(id);
    if(!timeline) {
        return next(new ErrorHandler("❌Timeline not found...❌", 404));
    }
    await timeline.deleteOne();
    res.status(200).json({
        success: true,
        message: "Timeline Deleted Successfully...!✅",
    });
});

export const getAllTimeLines = catchAsyncError(async(req, res, next) => {
    const timelines = await Timeline.find();
    res.status(200).json({
        success: true,
        timelines
    });
}); 