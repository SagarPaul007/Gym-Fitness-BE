import validator from "validator";
import { Request, Response, NextFunction } from "express";

export const validateRegisterInput = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.json({ success: false, message: "Please enter all fields" });
  } else if (!validator.isEmail(email)) {
    return res.json({ success: false, message: "Please enter a valid email" });
  } else if (!validator.isLength(password, { min: 5, max: 30 })) {
    return res.json({
      success: false,
      message: "Password must be between 5 and 30 characters",
    });
  } else if (!validator.isLength(name, { min: 3, max: 30 })) {
    return res.json({
      success: false,
      message: "Name must be between 3 and 30 characters",
    });
  }
  next();
};

export const validateLoginInput = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.json({ success: false, message: "Please enter all fields" });
  }
  next();
};
