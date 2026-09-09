import { NextFunction, Request, Response } from "express";

const errorHandler = (
  error: any,
  _: Request,
  res: Response,
  __: NextFunction,
) => {
  const message = error?.message ?? "Something went wrong";
  const status = error?.status ?? "Error";
  const success = error?.success ?? false;
  const statusCode = error?.statusCode ?? 500;

  res.status(statusCode).json({
    message,
    status,
    success,
    data: null,
    stack: error?.stack ?? null,
  });
};
export default errorHandler;
