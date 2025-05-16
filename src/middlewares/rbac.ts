import { Request, Response, NextFunction } from "express";
import { UserModel } from "../models/user";
import { sendError, sendResponse } from "../utils/response";

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        name: string;
        username: string;
        role_id?: number;
      };
    }
  }
}

export const checkPermission = (requiredPermissions: string) => {
  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      if (!req.user?.id) {
        sendResponse(res, 401, "Unauthorized");
        return;
      }
      try {
        const userRole = await UserModel.getUserRole(req.user.id);
        const hasPermission = userRole.permissions.some(
          (permission) => permission.name === requiredPermissions
        );
        if (!hasPermission) {
          sendResponse(res, 403, "Forbidden");
          return;
        }
        next();
      } catch (error) {
        sendError(res, 403, "Forbidden: Unable to verify permissions");
      }
    } catch (error) {
      sendError(res, 500, "Internal server error");
    }
  };
};

export const checkRole = (requiredRoles: string[]) => {
  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      if (!req.user?.id) {
        sendResponse(res, 401, "Unauthorized");
        return;
      }
      try {
        const userRole = await UserModel.getUserRole(req.user.id);

        if (!requiredRoles.includes(userRole.name)) {
          sendResponse(
            res,
            403,
            `Forbidden: Role '${
              userRole.name
            }' is not allowed. Required: ${requiredRoles.join(", ")}`
          );
          return;
        }

        next();
      } catch (error) {
        sendError(res, 403, "Forbidden: Unable to verify role");
      }
    } catch (error) {
      sendError(res, 500, "Internal server error");
    }
  };
};
