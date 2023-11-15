import { StatusCodes } from "http-status-codes";
import jobModel from "../model/jobModel.js";
import { NotFoundError } from "../errors/customErrors.js";

export const getAllJobs = async (req, res) => {
  const jobs = await jobModel.find();
  res.status(StatusCodes.OK).json({ jobs });
};

export const getJob = async (req, res) => {
  const job = await jobModel.findById(req.params.id);

  if (!job) throw new NotFoundError(`no job found`);

  res.status(StatusCodes.OK).json({ job });
};

export const createJob = async (req, res) => {
  const newJob = await jobModel.create(req.body);
  res.status(StatusCodes.CREATED).json({ newJob });
};

export const updateJob = async (req, res) => {
  const { id } = req.params;
  const job = await jobModel.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(StatusCodes.OK).json({ job });
};

export const deleteJob = async (req, res) => {
  const { id } = req.params;
  await jobModel.findByIdAndDelete(id);

  res.status(StatusCodes.OK).json({ msg: "job deleted" });
};
