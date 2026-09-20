import express, { NextFunction, Request, Response } from "express";
import errorHandler from "./middlewares/errorHandler.middleware";
import cookieParser from "cookie-parser";

//* importing routes'
import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes";
import amenityRoutes from "./routes/amenity.routes";

//* express app
const app = express();

//* using middleware
app.use(cookieParser());
app.use(express.json());
// to store in local server
app.use("/api/v1/uploads", express.static("uploads"));

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
app.use("/api/v1/users", userRoutes);
app.use("api/v1/amenities", amenityRoutes);

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
