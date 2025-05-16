import { Request, Response } from "express";
import { LoginDTO, UserDTO } from "../types/user";
import { sendError, sendResponse } from "../utils/response";
import { AuthService } from "../services/auth.service";

export class AuthController {
  static async register(req: Request, res: Response): Promise<void> {
    try {
      const userData: UserDTO = req.body;
      const { user, token } = await AuthService.register(userData);
      sendResponse(res, 201, "User Registration successful", {
        token,
        user: {
          id: user.id,
          name: user.name,
          username: user.username,
          role: user.role_name,
        },
      });
    } catch (error: any) {
      sendError(res, 400, error.message);
    }
  }

  static async login(req: Request, res: Response): Promise<void> {
    try {
      const loginData: LoginDTO = req.body;
      const { user, token } = await AuthService.login(loginData);

      sendResponse(res, 200, "Login successful", {
        token,
        user: {
          id: user.id,
          username: user.username,
          name: user.name,
          role: user.role_name,
        },
      });
    } catch (error: any) {
      sendError(res, 400, error.message);
    }
  }

  static async getProfile(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user?.id;
      if (!userId) {
        sendError(res, 401, "Unauthorized");
        return;
      }

      const user = await AuthService.getUserProfile(userId);
      sendResponse(res, 200, "Profile retrieved successfully", {
        user: {
          id: user.id,
          username: user.username,
          name: user.name,
          role: user.role_name,
        },
      });
    } catch (error: any) {
      sendError(res, 400, error.message);
    }
  }
}
