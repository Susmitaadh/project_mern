import { NextFunction, Request, Response } from "express";
import User from "../models/user.model";
import AppError from "../utils/appError.utils";
import { comparePassword, hashPassword } from "../utils/bcrypt.utils";
import { sendResponse } from "../utils/sendResponse.utils";
import { catachAsync } from "../utils/catchAsync.utils";
import { generateJwtToken } from "../utils/jwt.utils";

//* register
export const register = catachAsync(async (req, res) => {
  // console.log(req.body);
  const { full_name, email, password, phone } = req.body;
  const file = req.file;
  console.log(file);

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
  if (file) {
    user.profile_image = file?.path;
  }

  //* save user
  await user.save();

  //* convert user mongoose doc to js object
  const { password: _, ...rest } = user.toObject();

  //* success response
  sendResponse(res, {
    message: "Account created",
    statusCode: 201,
    data: rest,
  });
});

//* login
export const login = catachAsync(async (req, res) => {
  const { email, password } = req.body;

  if (!email) throw new AppError("Email is required", 400);

  if (!password) throw new AppError("Password is required", 400);

  //* find user by email
  const user = await User.findOne({ email }).select("+password");

  //* if !user throw error
  if (!user) throw new AppError("Invalid email or password", 400);

  //* compare password
  const isPassMatched = await comparePassword(password, user.password);

  //* if !password match throw error
  if (!isPassMatched) throw new AppError("Invalid email or password", 400);

  //* json web token / jwt.io
  const access_token = generateJwtToken({
    _id: user._id,
    email: user.email,
    role: user.role,
  });

  //* convert user mongoose doc to js object
  const { password: _, ...rest } = user.toObject();

  //* success response
  sendResponse(res, {
    message: "Login successful",
    statusCode: 201,
    data: {
      user: rest,
      access_token,
    },
  });
});

//* get profile
export const getProfile = catachAsync(async (req, res) => {});

//* change password

//* forgot password

//! Aug 20
