import UserModel from "../models/User.model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { JWT_SECRET } from "../utils/env";

export const getUser = async (
  req: Request & { user?: { _id?: string } },
  res: Response
) => {
  try {
    const user = await UserModel.findOne(
      { _id: req.user?._id },
      { password: 0 }
    ).lean();
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }
    res.json({
      success: true,
      user,
    });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    const existingEmail = await UserModel.findOne({ email });
    if (existingEmail) {
      return res.json({ success: false, message: "Email already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await UserModel.create({
      name,
      email,
      password: hashedPassword,
    });
    const token = jwt.sign({ _id: user._id }, JWT_SECRET);
    res.json({ success: true, message: "User registered", token });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "Invalid email or password" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({ success: false, message: "Invalid email or password" });
    }
    const token = jwt.sign({ _id: user._id }, JWT_SECRET);
    res.json({ success: true, message: "User logged in successfully", token });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};
