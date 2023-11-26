import "express-async-errors";
import * as dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import mongoose from "mongoose";
import path from "path";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import ExpressMongoSanitize from "express-mongo-sanitize";

import errorHandlerMiddleware from "./middleware/errorHandlerMiddleware.js";
import authRouter from "./routes/authRouter.js";
import jobRouter from "./routes/jobRouter.js";
import userRouter from "./routes/userRouter.js";
import { authenticateUser } from "./middleware/authMiddleware.js";

dotenv.config();
// eslint-disable-next-line no-undef
const { DATABASE, PORT, NodeENV } = process.env;
const __dirname = path.dirname(import.meta.url);

const app = new express();
app.use(express.static(path.resolve(__dirname, "./client")));
app.use(express.json());
app.use(cookieParser());
app.use(helmet());
app.use(ExpressMongoSanitize());

if (NodeENV === "development") app.use(morgan("dev"));

app.use("/api/v1/job", authenticateUser, jobRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user", authenticateUser, userRouter);

app.use("*", (req, res) =>
  res.sendFile(path.resolve(__dirname, "./client", "index.html"))
);

app.use("*", (req, res) => res.status(404).json({ msg: "not found" }));

app.use(errorHandlerMiddleware);

const port = PORT || 3000;

try {
  await mongoose.connect(DATABASE);
  app.listen(port, () => console.log("server running on port: " + port));
} catch (error) {
  console.log(error);
}
