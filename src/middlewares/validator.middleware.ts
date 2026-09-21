import { NextFunction, Request, Response } from "express";
import { ZodObject } from "zod";
import AppError from "../utils/appError.utils";

export const validate = (schema: ZodObject) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse({
      body: {
        ...req.body,
        address: JSON.parse(req.body.address),
      },
      params: req.params,
      query: req.query,
    });

    if (result.success) {
      req.body = result.data.body;
      Object.assign(req.params, result.data.params);
      Object.assign(req.query, result.data.query);
      next();
    } else {
      console.log(result.error.issues);
      const errors = result.error.issues.map(({ path, message }) => {
        return {
          path: path.join("."),
          message,
        };
      });
      next(new AppError("Validation Error", 400, "VALIDATION_ERROR", errors));
    }
  };
};
