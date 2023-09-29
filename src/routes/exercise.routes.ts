import express from "express";
const router = express.Router();
import * as exerciseController from "../controllers/exercise";

router.get("/listExercises", exerciseController.listExercises);

export default router;
