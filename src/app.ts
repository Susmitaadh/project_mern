import express from "express";

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

export default app;
