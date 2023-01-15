import express from "express";
const router = express.Router();
import {
  validateRegisterInput,
  validateLoginInput,
} from "../middlewares/validate";
import * as userController from "../controllers/user";

router.post("/register", validateRegisterInput, userController.registerUser);
router.post("/login", validateLoginInput, userController.loginUser);
router.get("/getUser", userController.getUser);

export default router;
