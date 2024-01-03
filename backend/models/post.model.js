import { error } from "console";
import { postsCollection } from "../utils/collections.util.js";

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
    const res = await postsCollection
      .find(searchPayload, filterPayload)
      .populate("user", "name email")
      .populate({
        path: "comments",
        populate: {
          path: "user",
          select: "name email",
          model: "User",
        },
      })
      .populate({
        path: "comments",
        select: "content createdAt updatedAt",
      })
      .then((posts) => {
        return posts;
      })
      .catch((error) => {
        throw error;
      });
    if (!res) return;
    return res;
  } catch (error) {
    throw error;
  }
};

export const searchPosts = async (searchString) => {
  try {
    let res = await postsCollection.aggregate([
      {
        $match: {
          $or: [
            { title: { $regex: searchString, $options: "i" } },
            { content: { $regex: searchString, $options: "i" } },
          ],
        },
      },
      {
        $lookup: {
          from: "comments",
          localField: "comments",
          foreignField: "_id",
          as: "commentsData",
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "user",
          foreignField: "_id",
          as: "userData",
        },
      },
      {
        $addFields: {
          user: "$userData",
        },
      },
      {
        $addFields: {
          comments: "$commentsData",
        },
      },
      {
        $project: {
          commentsData: 0, // Exclude the intermediate commentsData field
          userData: 0,
        },
      },
    ]);
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
