import express from "express";
const router = express.Router();
import * as exerciseController from "../controllers/exercise";

router.get("/getExercises", exerciseController.getExercises);

export default router;
