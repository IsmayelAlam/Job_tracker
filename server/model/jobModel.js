import mongoose from "mongoose";
import { JOB_STATUS, JOB_TYPE } from "../utils/constance.js";

const jobSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    position: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    status: {
      type: String,
      enum: Object.values(JOB_STATUS),
      default: "pending",
    },
    link: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    type: {
      type: String,
      enum: Object.values(JOB_TYPE),
      default: "fulltime",
    },
    location: {
      type: String,
      default: "remote",
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "users",
    },
  },
  {
    timestamps: true,
    validateBeforeSave: true,
  }
);

export default mongoose.model("jobs", jobSchema);
