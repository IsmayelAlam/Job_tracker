import mongoose from "mongoose";

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
      enum: ["interview", "declined", "pending"],
      default: "pending",
    },
    type: {
      type: String,
      enum: ["fulltime", "part-time", "freelance", "internship"],
      default: "fulltime",
    },
    location: {
      type: String,
      default: "remote",
    },
  },
  {
    timestamps: true,
    validateBeforeSave: true,
  }
);

export default mongoose.model("jobs", jobSchema);
