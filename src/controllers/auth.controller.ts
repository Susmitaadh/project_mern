import { NextFunction, Request, Response } from "express";
import User from "../models/user.model";
import AppError from "../utils/appError.utils";
import { comparePassword, hashPassword } from "../utils/bcrypt.utils";

//* register
export const register = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // console.log(req.body);
    const { full_name, email, password, phone } = req.body;

    if (!full_name) {
      //   const error: any = new Error("Full name is required");
      //   error.statusCode = 400;
      //   error.status = "fail";
      //   error.success = false;
      //   throw error;
      throw new AppError("Full name is required", 400);
    }
    if (!email) {
      throw new AppError("Email is required", 400);
    }
    if (!password) throw new AppError("Password is required", 400);

    //* user instance
    const user = new User({ full_name, email, password, phone });

    //* hash passwowrd
    const hash = await hashPassword(password);
    user.password = hash;

    //todo: upload profile image

    //* save user
    await user.save();

    //* convert user mongoose doc to js object
    const { password: _, ...rest } = user.toObject();

    //* success response
    res.status(201).json({
      message: "Account created",
      data: rest,
      success: true,
      status: "success",
    });
  } catch (error) {
    next(error);
  }
};

//* login
export const login = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email, password } = req.body;

    if (!email) throw new AppError("Email is required", 400);

    if (!password) throw new AppError("Password is required", 400);

    //* find user by email
    const user = await User.findOne({ email });

    //* if !user throw error
    if (!user) throw new AppError("Invalid email or password", 400);

    //* compare password
    const isPassMatched = await comparePassword(password, user.password);

    //* if !password match throw error
    if (!isPassMatched) throw new AppError("Invalid email or password", 400);

    // todo: jwt token

    //* convert user mongoose doc to js object
    const { password: _, ...rest } = user.toObject();

    //* success response
    res.status(201).json({
      message: "Login successful",
      status: "success",
      success: true,
      data: rest,
    });
  } catch (error) {
    next(error);
  }
};

//* get profile

//* change password

//* forgot password


