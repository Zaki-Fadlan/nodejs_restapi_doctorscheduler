import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { sendResponse, sendError } from "../utils/response";
dotenv.config();

export interface AuthRequest extends Request {
  user?: {
    id: string;
    name: string;
    username: string;
    role_id?: number;
  };
}

export const authenticateToken = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
      sendError(res, 401, "Unauthorized");
      return;
    }
    if (!process.env.JWT_SECRET) {
      sendError(res, 500, "JWT secret is not defined");
      return;
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET) as {
      id: string;
      name: string;
      username: string;
      role_id?: number;
    };
    req.user = decoded;
    next();
  } catch (error) {
    sendError(res, 403, "Invalid or expired token");
  }
};
