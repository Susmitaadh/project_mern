import express from "express";
import errorHandler from "./middlewares/errorHandler.middleware";

//* express app
const app = express();

//* using middleware

//* health route
app.use("/", (req, res) => {
  res.status(200).json({
    message: "Server is up and running",
    success: true,
    status: "success",
    data: null,
  });
});

//* using routes

//* path not found

//* error handler
app.use(errorHandler);

export default app;
