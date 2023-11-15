import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: true,
      unique: true,
    },
    position: String,
    status: {
      type: String,
      enum: ["interview", "declined", "pending"],
      default: "pending",
    },
    type: {
      type: String,
      enum: ["fulltime", "part-time", "freelance", "internship"],
    },
    location: {
      type: String,
      default: "remote",
    },
  },
  { timestamps: true }
);

export default mongoose.model("jobs", jobSchema);
