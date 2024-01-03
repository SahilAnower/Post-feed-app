import mongoose from "mongoose";

import dotenv from "dotenv";

dotenv.config();

const uri = process.env.MONGODB_URI;

const mongodbConnection = mongoose.createConnection(uri);

mongodbConnection.on("connecting", () => {
  console.log("attempting to create a connection with mongodb");
});

mongodbConnection.on("open", () => {
  console.log("connection with mongodb successfully created");
});

mongodbConnection.on("error", (err) => {
  console.log("error in creating a connection with mongo db, error: ", err);
});

export default mongodbConnection;
