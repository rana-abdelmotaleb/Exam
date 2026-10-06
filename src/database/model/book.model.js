import mongoose, { Schema, Types } from "mongoose";
import { statusEnum } from "../../common/index.js";

const bookSchema = Schema(
  {
    userId: {
      type: Types.ObjectId,
      required: true,
      ref: "user",
    },
    title: {
      type: String,
      required: true,
    },
    bookingDate: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: statusEnum,
      default: statusEnum.pending,
    },
  },
  { timestamps: true },
);

export const bookModel = mongoose.model("book", bookSchema);
