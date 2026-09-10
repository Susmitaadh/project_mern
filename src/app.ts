import express, { NextFunction, Request, Response } from "express";
import errorHandler from "./middlewares/errorHandler.middleware";

//* express app
const app = express();

//* using middleware


//* health route
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Server is up and running",
    success: true,
    status: "success",
    data: null,
  });
});

//* using routes

//* path not found
app.use((req: Request, _: Response, next: NextFunction) => {
  const error: any = new Error(`Cannot ${req.method} on ${req.path}`);
  error.statusCode = 404;
  error.status = "fail";
  error.success = false;
  next(error);
});

//* error handler
app.use(errorHandler);

export default app;
