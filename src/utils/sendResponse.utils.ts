import { Response } from "express";

interface IResponseData<T> {
  message: string;
  statusCode: number;
  data: T;
}

export const sendResponse = <T>(
  res: Response,
  { message, statusCode, data }: IResponseData<T>,
) => {
  res.status(statusCode).json({
    message,
    data,
    success: String(statusCode).startsWith("2"),
    status: String(statusCode).startsWith("2")
      ? "success"
      : String(statusCode).startsWith("4")
        ? "fail"
        : "error",
  });
};
