import express from "express";
import { postTimeLine, deleteTimeLine, getAllTimeLines } from "../controllers/timelineController.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/add", isAuthenticated, postTimeLine ); //like:-> 10th ki detail hui, 12th ki detail etc...
router.delete("/delete/:id", isAuthenticated, deleteTimeLine);
router.get("/getall", getAllTimeLines);

export default router;