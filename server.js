import "express-async-errors";
import * as dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import jobRouter from "./server/routes/jobRouter.js";
import mongoose from "mongoose";
import errorHandlerMiddleware from "./server/middleware/errorHandlerMiddleware.js";

dotenv.config();
const { DATABASE, PORT, NodeENV } = process.env;

const app = new express();
app.use(express.json());

if (NodeENV === "development") app.use(morgan("dev"));

app.use("/api/v1/job", jobRouter);

app.use("*", (req, res) => res.status(404).json({ msg: "not found" }));

app.use(errorHandlerMiddleware);

try {
  await mongoose.connect(DATABASE);
  app.listen(PORT, () => console.log("server running"));
} catch (error) {
  console.log(error);
}
