import { catchAsyncError } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";
import { Project } from "../models/projectSchema.js";
import {v2 as cloudinary} from "cloudinary";

export const addNewProject = catchAsyncError(async(req, res, next) => {
    if(!req.files || Object.keys(req.files).length == 0){
        return next(new ErrorHandler("Project Image Required...!💯⚠️🚨"))
    }

    const {projectBanner} = req.files;
    const { title, description, gitRepoLink, projectLink, technologies, stack, deployed } = req.body;
    if(!title|| !description || !gitRepoLink || !projectLink || !technologies || !stack || !deployed){
        return next(new ErrorHandler("Please fill all the fields...!⚠️🚨⚠️"));
    }

    const cloudinaryResponse = await cloudinary.uploader.upload(projectBanner.tempFilePath, {
        folder: "PORTFOLIO PROJECT IMAGES"
    });
    if(!cloudinaryResponse || cloudinaryResponse.error){
        console.error( "Cloudinary Error:", cloudinaryResponse.error.message || "Unknown Cloudinary Error" );
        return next(new ErrorHandler("Failed to upload projectImage to Cloudinary...⏳⚠️⏳", 500))
    }

    const project = await Project.create({
        title,
        description,
        gitRepoLink,
        projectLink,
        technologies,
        stack,
        deployed,
        projectBanner: {
            public_id: cloudinaryResponse.public_id,
            url: cloudinaryResponse.secure_url
        }
    });
    res.status(201).json({
        success: true,
        message: "New Project Added Successfully...!✅",
        project
        });

});

export const deleteProject = catchAsyncError(async(req, res, next) => {
    const {id} = req.params;
    const project = await Project.findById(id);
    if(!project){
        return next(new ErrorHandler("Project Not Found...!⚠️🚨⚠️", 400));
    }
    await project.deleteOne();
    res.status(200).json({
        success: true,
        message: "Project Deleted Successfully...!✅"
    });
});

export const updateProject = catchAsyncError(async(req, res, next) => {
    const newProjectData = {
        title: req.body.title,
        description: req.body.description, 
        gitRepoLink: req.body.gitRepoLink, 
        projectLink: req.body.projectLink, 
        technologies: req.body.technologies, 
        stack: req.body.stack, 
        deployed: req.body.deployed
    }
    if(req.files && req.files.projectBanner){
        const projectBanner = req.files.projectBanner;
        // console.log("projectimage", projectBanner);
        const project = await Project.findById(req.params.id);
        // console.log("project", project);
        const projectImageID = project.projectBanner.public_id;
        // console.log('projectimageID', projectImageID);
        await cloudinary.uploader.destroy(projectImageID);

        const cloudinaryResponse = await cloudinary.uploader.upload(projectBanner.tempFilePath, {
            folder: "PORTFOLIO PROJECT IMAGES"
        });
        newProjectData.projectBanner = {
            public_id: cloudinaryResponse.public_id,
            url: cloudinaryResponse.secure_url
        };
    }

    const project = await Project.findByIdAndUpdate(req.params.id, newProjectData, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });
    res.status(200).json({
        success: true,
        message: "Project Updated Successfully...!✅",
        project
    });

});

export const getAllProjects = catchAsyncError(async(req, res, next) => {
    const projects = await Project.find();
    res.status(200).json({
        success: true,
        projects
    });
});

export const getSingleProject = catchAsyncError(async(req, res,nex) => {
    // const {id} = req.params;
    // const project = await Project.findById(id); //EK AUR METHOD AISE LIKHNE KA
    const project = await Project.findById(req.params.id);// DOOSRA METHOD UPPAR  WALE KA
    if(!project){
        return next(new ErrorHandler("Project Not Found...!⚠️🚨⚠️", 400));
    }
    res.status(200).json({
        success: true,
        project
    });
});