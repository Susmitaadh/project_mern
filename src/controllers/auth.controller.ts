import { NextFunction, Request } from "express";
import User from "../models/user.model";

//* register
export const register = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { full_name, email, password, phone } = req.body;

    if (!full_name) {
      const error: any = new Error("Full name is required");
      error.statusCode = 400;
      error.status = "fail";
      error.success = false;
    }
    if (!email) {
      const error: any = new Error("Email is required");
      error.statusCode = 400;
      error.status = "fail";
      error.success = false;
    }
    if (!password) {
      const error: any = new Error("Password is required");
      error.statusCode = 400;
      error.status = "fail";
      error.success = false;
    }
  } catch (error) {
    next(error);
  }
};

//* login

//* get profile

//* change password

//* forgot password
