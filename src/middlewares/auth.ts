import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { JWT_SECRET } from "../utils/env";

export const authenticate = (
  req: Request & { user?: { _id?: string } },
  _: Response,
  next: NextFunction
) => {
  function handleUserNotFound() {
    req.user = {};
    next();
  }
  const authHeader = req.headers.authorization;
  if (!authHeader) return handleUserNotFound();
  const token = authHeader?.split(" ")[1];
  if (!token) return handleUserNotFound();
  jwt.verify(token, JWT_SECRET, (err: Error, decoded: { _id?: string }) => {
    if (err) return handleUserNotFound();
    req.user = decoded;
    next();
  });
};
