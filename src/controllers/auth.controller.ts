import { Request, Response } from "express";
import User from "../models/user.model";
import AppError from "../utils/appError.utils";
import { comparePassword, hashPassword } from "../utils/bcrypt.utils";
import { sendResponse } from "../utils/sendResponse.utils";
import { catchAsync } from "../utils/catchAsync.utils";
import { generateJwtToken } from "../utils/jwt.utils";
import { uploadFileToCloudinary } from "../utils/cloudinary.utils";
import ENV_CONFIG from "../config/env.config";
import { Role } from "../types/enum.types";
import { sendEmail } from "../utils/sendEmail.utils";
import {
  generateAccountCreatedHtml,
  generateNewLoginDetectedHtml,
} from "../utils/emailtemplate.utils";

//* register
export const register = catchAsync(async (req: Request, res: Response) => {
  // console.log(req.body);
  const { full_name, email, password, phone, host = false } = req.body;
  const file = req.file;

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

  if (host) {
    user.role = Role.HOST;
  }

  //* upload profile image
  if (file) {
    // user.profile_image = file?.path;

    //* upload file to cloudinary
    const { path, public_id } = await uploadFileToCloudinary(file, folder);
    user.profile_image = {
      path,
      public_id,
    };
  }

  //* save user
  await user.save();

  //* send email
  sendEmail({
    to: user.email,
    subject: "Account created",
    html: generateAccountCreatedHtml({
      email: user.email,
      full_name: user.full_name,
      created_at: new Date(Date.now()),
      agent: req.headers["user-agent"] ?? "unknown",
    }),
  });

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
export const login = catchAsync(async (req, res) => {
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

  //* cookie
  res.cookie("access_token", access_token, {
    httpOnly: ENV_CONFIG.NODE_ENV === "development" ? false : true,
    secure: ENV_CONFIG.NODE_ENV === "development" ? false : true,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    sameSite: ENV_CONFIG.NODE_ENV === "development" ? "lax" : "strict",
  });

  // res.cookie("abc", "abc");

  //* send new login email
  sendEmail({
    to: user.email,
    subject: "New Login Detected",
    html: generateNewLoginDetectedHtml({
      email: user.email,
      full_name: user.full_name,
      loggedIn_at: new Date(Date.now()),
      agent: req.headers["user-agent"] ?? "unknown",
    }),
  });

  //* convert user mongoose doc to js object
  const { password: _, ...rest } = user.toObject();

  //* success response
  sendResponse(res, {
    message: "Login successful",
    statusCode: 201,
    data: {
      user: rest,
      // access_token,
    },
  });
});

//* get profile
export const getProfile = catchAsync(async (req, res) => {
  const { _id } = req.user;
  const profile = await User.findOne({ _id });

  if (!profile) throw new AppError("something went wrong", 500);

  sendResponse(res, {
    message: "Profile fetched",
    data: profile,
    statusCode: 200,
  });
});

//* change password

//* forgot password
