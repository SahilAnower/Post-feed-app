import { PostSchema } from "../schemas/Post";
import mongodbConnection from "../utils/mongo-db.util";

const dbName = process.env.DB;

const feedAppDb = mongodbConnection.useDb(dbName);

const postsCollection = feedAppDb.model("Post", PostSchema);

export const createPost = async (payload) => {
  try {
    const res = await postsCollection.create(payload);
    if (!res) return;
    return res;
  } catch (error) {
    throw error;
  }
};

export const getAllPosts = async (
  searchPayload = null,
  filterPayload = null
) => {
  try {
    const res = await postsCollection.find(searchPayload, filterPayload);
    if (!res) return;
    return res;
  } catch (error) {
    throw error;
  }
};

export const updatePost = async (searchPayload, updatePayload) => {
  try {
    const res = await postsCollection.findOneAndUpdate(
      searchPayload,
      updatePayload,
      {
        new: true,
      }
    );
    if (!res) return;
    return res;
  } catch (error) {
    throw error;
  }
};

export const deletePost = async (searchPayload) => {
  try {
    const res = await postsCollection.findOneAndDelete(searchPayload);
    if (!res) return;
    return res;
  } catch (error) {
    throw error;
  }
};
