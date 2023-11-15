import { StatusCodes } from "http-status-codes";
import { nanoid } from "nanoid";

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

export const createJob = async (req, res) => {
  res.status(StatusCodes.CREATED).json({ mes: "created" });
};

export const getJob = async (req, res) => {
  res.status(StatusCodes.OK).json({ mes: "job" });
};

export const updateJob = async (req, res) => {
  res.status(StatusCodes.OK).json({ msg: "job modified" });
};

export const deleteJob = async (req, res) => {
  res.status(StatusCodes.OK).json({ msg: "job deleted" });
};
