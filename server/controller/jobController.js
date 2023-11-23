import { StatusCodes } from "http-status-codes";
import jobModel from "../model/jobModel.js";
import { NotFoundError } from "../errors/customErrors.js";
import mongoose from "mongoose";
import dayjs from "dayjs";

export const getAllJobs = async (req, res) => {
  const { search, status, type } = req.query;

  const queryObj = {
    createdBy: req.user.userId,
  };

  if (search)
    queryObj.$or = [
      { position: { $regex: search, $options: "i" } },
      { company: { $regex: search, $options: "i" } },
    ];
  if (status && status !== "all") queryObj.status = status;
  if (type && type !== "all") queryObj.type = type;

  const jobs = await jobModel.find(queryObj);
  res.status(StatusCodes.OK).json({ jobs, size: jobs.length });
};

export const getJob = async (req, res) => {
  const job = await jobModel.findOne({
    _id: req.params.id,
    createdBy: req.user.userId,
  });

  if (!job) throw new NotFoundError(`no job found`);

  res.status(StatusCodes.OK).json({ job });
};

export const createJob = async (req, res) => {
  req.body.createdBy = req.user.userId;
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

export const showStats = async (req, res) => {
  let stats = await jobModel.aggregate([
    { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
    { $group: { _id: "$status", count: { $sum: 1 } } },
  ]);
  stats = stats.reduce((acc, curr) => {
    const { _id: title, count } = curr;
    acc[title] = count;
    return acc;
  }, {});

  const defaultStats = {
    pending: stats.pending || 0,
    interview: stats.interview || 0,
    declined: stats.declined || 0,
    offered: stats.offered || 0,
  };

  let monthlyApplications = await jobModel.aggregate([
    { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
    {
      $group: {
        _id: { year: { $year: "$createdAt" }, month: { $month: "$createdAt" } },
        count: { $sum: 1 },
      },
    },
    { $sort: { "_id.year": -1, "_id.month": -1 } },
    { $limit: 6 },
  ]);

  monthlyApplications = monthlyApplications
    .map((item) => {
      const {
        _id: { year, month },
        count,
      } = item;

      const date = dayjs()
        .month(month - 1)
        .year(year)
        .format("MMM YY");
      return { date, count };
    })
    .reverse();

  res.status(StatusCodes.OK).json({ defaultStats, monthlyApplications });
};
