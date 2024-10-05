// const express = require("express") // First Method to write this 
import express from "express"; //Second Method to write this when we change few things inside the "package.json" file
import dotenv from "dotenv";
import cors from "cors"; 
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import dbConnection from "./database/dbConnection.js";
import {errorMiddleware} from "./middlewares/error.js";
import messageRouter from "./routers/messageRoute.js";
import userRouter from "./routers/userRoute.js";
import timelineRouter from "./routers/timelineRoute.js";
import applicationRouter from "./routers/softwareApplicationRoute.js";
import skillRouter from "./routers/skillRoute.js";
import projectRouter from "./routers/projectRoute.js";

const app = express();
dotenv.config({path:"./config/config.env"});

app.use(
    cors({
        origin: [process.env.PORTFOLIO_URL, process.env.DASHBOARD_URL],
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
    })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(
    fileUpload({
        useTempFiles: true,
        tempFileDir: "/tmp/",
    })
);

app.use("/api/v1/message", messageRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/timeline", timelineRouter);
app.use("/api/v1/softwareApplication", applicationRouter);
app.use("/api/v1/skill", skillRouter);
app.use("/api/v1/project", projectRouter);

dbConnection();
app.use(errorMiddleware);


export default app;