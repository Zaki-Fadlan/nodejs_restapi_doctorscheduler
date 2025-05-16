import { Request, Response } from "express";
import { sendResponse, sendError } from "../utils/response";
export class UsersController {
  static async getUsers(req: Request, res: Response): Promise<void> {
    try {
      sendResponse(res, 200, "Users data retrieved successfully", {
        message: "Users data retrieved successfully",
        data: [],
      });
    } catch (error: any) {
      sendError(res, 500, error.message);
    }
  }
  static async getUsersById(req: Request, res: Response): Promise<void> {
    try {
    } catch (err) {}
  }
  static async createUsers(req: Request, res: Response): Promise<void> {
    try {
    } catch (err) {}
  }
  static async updateUsers(req: Request, res: Response): Promise<void> {
    try {
    } catch (err) {}
  }
  static async deleteUsers(req: Request, res: Response): Promise<void> {
    try {
    } catch (err) {}
  }
}
