import mongoose, { Schema } from "mongoose";

const userSchema = Schema(
  {
    userName: {
      type: String,
      required: true,
      max: 50,
      min: 3,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

export const userModel = mongoose.model("user", userSchema);
