import { NextFunction, Request, Response } from "express";
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

    //* user instance
    const user = new User({ full_name, email, password, phone });

    //todo: hash passwowrd

    //todo: upload profile image

    //* save user
    await user.save();

    //* success response
    res.status(201).json({
      message: "Account created",
      data: user,
      success: true,
      status: "success",
    });
  } catch (error) {
    next(error);
  }
};

//* login

//* get profile

//* change password

//* forgot password
