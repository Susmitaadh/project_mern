import { NextFunction, Request, Response } from "express";
import { Role } from "../types/enum.types";
import AppError from "../utils/appError.utils";
import { verifyToken } from "../utils/jwt.utils";

export const authenticate = (roles?: Role[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      //* get access_token from cookie
      console.log(req.cookies);
      const token = req.cookies["access_token"];
      console.log(token);

      //* if not access_token -> throw unauthorized error
      if (!token)
        throw new AppError("unauthorized.token.required.", 401, "UNAUTHORIZED");

      //* verify token -> jwt.verify()
      const decoded_data = verifyToken(token);
      console.log(decoded_data);

      //* if not verified -> throw unauthorized error
      if (!decoded_data) {
        throw new AppError("unauthorized.access denied.", 401, "UNAUTHORIZED");
      }

      //* role
      if (roles && !roles.includes(decoded_data.role)) {
        throw new AppError("forbidden.access denied", 403, "FORBIDDEN");
      }

      req.user = {
        _id: decoded_data._id,
        email: decoded_data.email,
        role: decoded_data.role,
      };

      next();
    } catch (error) {
      next(error);
    }
  };
};
