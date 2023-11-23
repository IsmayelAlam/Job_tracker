import { StatusCodes } from "http-status-codes";

import { NotFoundError } from "../errors/customErrors.js";
import userModels from "../model/userModels.js";
import jobModel from "../model/jobModel.js";

export const getCurrentUser = async (req, res) => {
  const user = await userModels.findById(req.user.userId);
  if (!user) throw new NotFoundError(`no user found`);

  res.status(StatusCodes.OK).json({ user });
};

export const updateUser = async (req, res) => {
  const { userId } = req.user;
  const User = await userModels.findByIdAndUpdate(userId, req.body, {
    runValidators: true,
  });

  res.status(StatusCodes.OK).json({ User });
};

export const getApplicationStats = async (req, res) => {
  const users = await userModels.countDocuments();
  const jobs = await jobModel.countDocuments();
  res.status(StatusCodes.OK).json({ users, jobs });
};
