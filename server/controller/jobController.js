import { StatusCodes } from "http-status-codes";
import { nanoid } from "nanoid";
import jobModel from "../model/jobModel.js";

let jobs = [
  {
    id: nanoid(),
    company: "apple",
    position: "frontend",
  },
  {
    id: nanoid(),
    company: "google",
    position: "frontend",
  },
];

export const getAllJobs = async (req, res) => {
  res.status(StatusCodes.OK).json({ jobs });
};

export const getJob = async (req, res) => {
  res.status(StatusCodes.OK).json({ mes: "job" });
};

export const createJob = async (req, res) => {
  const newJob = await jobModel.create(req.body);
  res.status(StatusCodes.CREATED).json({ newJob });
};

export const updateJob = async (req, res) => {
  res.status(StatusCodes.OK).json({ msg: "job modified" });
};

export const deleteJob = async (req, res) => {
  res.status(StatusCodes.OK).json({ msg: "job deleted" });
};
