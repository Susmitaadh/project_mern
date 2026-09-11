import { NextFunction, Request, RequestHandler, Response } from "express";

export const catachAsync = (fn: RequestHandler) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch((error) => next(error));
    // try {
    //     fn(req, res, next);

    // } catch (error) {
    //     next(error);
    // }
  };
};
