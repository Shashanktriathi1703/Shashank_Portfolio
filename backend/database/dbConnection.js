import mongoose from "mongoose";

const dbConnection = () => {
    mongoose.connect(process.env.MONGODB_URI, {
        dbName: "PORTFOLIO"
    }).then(()=>{
        console.log("Database connected Successfully...");
    }).catch((error)=>{
        console.log(`Some Error Occured while Connecting To Database: ${error}`);
    });
};

export default dbConnection;