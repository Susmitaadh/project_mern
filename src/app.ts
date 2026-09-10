import express, { NextFunction, Request, Response } from "express";
import errorHandler from "./middlewares/errorHandler.middleware";

//* importing routes'
import authRoutes from "./routes/auth.routes";

//* express app
const app = express();

//* using middleware
app.use(express.json());

//* health route
app.get("/", (_, res) => {
  res.status(200).json({
    message: "Server is up and running",
    success: true,
    status: "success",
    data: null,
  });
});

//* using routes
app.use("/api/v1/auth", authRoutes); // v1 is api version

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
