import mongoose from "mongoose";

export const AuthenticationSchema = new mongoose.Schema({
  userId: String,
  email: String,
  encryptedPassword: String,
  refreshToken: String,
  mode: String,
  createdAtUnix: Number,
  updatedAtUnix: Number,
});
