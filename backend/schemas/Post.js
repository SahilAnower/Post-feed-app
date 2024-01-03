import mongoose, { Schema } from "mongoose";

export const PostSchema = new mongoose.Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);
