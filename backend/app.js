import express from "express";
import morgan from "morgan";

import projectRouter from "./routes/projects.js";
import userRouter from "./routes/users.js";
import { AppError } from "./utils/apperror.js";
import globalErrorHandler from "./controllers/errorController.js";

const app = express();
app.use(express.json());

app.use("/api/users", userRouter);
app.use("/api/projects", projectRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
