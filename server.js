import "express-async-errors";
import * as dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import jobRouter from "./server/routes/jobRouter.js";
import mongoose from "mongoose";

dotenv.config();
const { env } = process;

const app = new express();
app.use(express.json());

if (env.NodeENV === "development") app.use(morgan("dev"));

app.use("/api/v1/job", jobRouter);

app.use("*", (req, res) => res.status(404).json({ msg: "not found" }));

app.use((err, req, res, next) =>
  res.status(500).json({ msg: "something went wrong", err })
);

try {
  await mongoose.connect(env.DATABASE);
  app.listen(env.PORT, () => console.log("server running"));
} catch (error) {
  console.log(error);
}
