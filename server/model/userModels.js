import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please inout a valid name"],
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Please inout a valid email"],
      trim: true,
      lowercase: true,
      validate: {
        validator: function (v) {
          return /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(v);
        },
        message: (props) => `${props.value} is not a valid email!`,
      },
    },
    password: {
      type: String,
      required: [true, "Please inout a valid password"],
      minLength: 8,
    },
    location: String,
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    avatar: String,
    avatarPublicId: String,
  },
  {
    timestamps: true,
    validateBeforeSave: true,
  }
);

export default mongoose.model("user", UserSchema);
