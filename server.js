import "express-async-errors";
import * as dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import mongoose from "mongoose";

import errorHandlerMiddleware from "./server/middleware/errorHandlerMiddleware.js";
import authRouter from "./server/routes/authRouter.js";
import jobRouter from "./server/routes/jobRouter.js";
import userRouter from "./server/routes/userRouter.js";
import { authenticateUser } from "./server/middleware/authMiddleware.js";
import cookieParser from "cookie-parser";

dotenv.config();
// eslint-disable-next-line no-undef
const { DATABASE, PORT, NodeENV } = process.env;

const app = new express();
app.use(express.json());
app.use(cookieParser());

if (NodeENV === "development") app.use(morgan("dev"));

app.use("/api/v1/job", authenticateUser, jobRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user", authenticateUser, userRouter);

app.use("*", (req, res) => res.status(404).json({ msg: "not found" }));

app.use(errorHandlerMiddleware);

try {
  await mongoose.connect(DATABASE);
  app.listen(PORT, () => console.log("server running"));
} catch (error) {
  console.log(error);
}
