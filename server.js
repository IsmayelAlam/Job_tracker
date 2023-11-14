import * as dotenv from "dotenv";
import express from "express";
import morgan from "morgan";

dotenv.config();

const app = new express();
app.use(express.json());

if (process.env.NodeENV === "development") app.use(morgan("dev"));

app.get("/", (req, res) => res.send("hello"));

app.listen(5100, () => console.log("server running"));
