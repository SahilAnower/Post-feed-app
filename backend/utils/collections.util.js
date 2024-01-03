import dotenv from "dotenv";
dotenv.config();

import { CommentSchema } from "../schemas/Comment.js";
import { AuthenticationSchema } from "../schemas/Authentication.js";
import { PostSchema } from "../schemas/Post.js";
import { UserSchema } from "../schemas/User.js";
import mongodbConnection from "../utils/mongo-db.util.js";

const dbName = process.env.DB;

const feedAppDb = mongodbConnection.useDb(dbName);

export const commentsCollection = feedAppDb.model("Comment", CommentSchema);

export const authenticationCollection = feedAppDb.model(
  "Authentication",
  AuthenticationSchema
);

export const postsCollection = feedAppDb.model("Post", PostSchema);

export const usersCollection = feedAppDb.model("User", UserSchema);
