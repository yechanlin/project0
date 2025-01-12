import express from "express";
import morgan from "morgan";
import projectRouter from "./routes/projects.js";
import userRouter from "./routes/users.js";

const app = express();
app.use(express.json());

app.use("/api/users", userRouter);
app.use("/api/projects", projectRouter);

module.exports = app;
