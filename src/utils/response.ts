import { Response } from "express";

interface ApiResponse<T> {
  message: string;
  body?: T;
}
export const sendResponse = <T>(
  res: Response,
  statusCode: number,
  message: string,
  body?: T
): void => {
  const response: ApiResponse<T> = {
    message,
  };

  if (body !== undefined) {
    response.body = body;
  }
  res.status(statusCode).json(response);
};

export const sendError = (
  res: Response,
  statusCode: number,
  message: string
): void => {
  res.status(statusCode).json({
    message,
  });
};
