import { commentsCollection } from "../utils/collections.util.js";

export const createComment = async (payload) => {
  try {
    const res = await commentsCollection.create(payload);
    if (!res) return;
    return res;
  } catch (error) {
    throw error;
  }
};

export const getAllComments = async (
  searchPayload = null,
  filterPayload = null
) => {
  try {
    const res = await commentsCollection.find(searchPayload, filterPayload);
    if (!res) return;
    return res;
  } catch (error) {
    throw error;
  }
};

export const searchComments = async (searchString) => {
  try {
    let res = await commentsCollection.aggregate([
      {
        $match: {
          $or: [{ content: { $regex: searchString, $options: "i" } }],
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
        $project: {
          userData: 0,
        },
      },
    ]);
    return res;
  } catch (error) {
    throw error;
  }
};

export const updateComment = async (searchPayload, updatePayload) => {
  try {
    const res = await commentsCollection.findOneAndUpdate(
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

export const deleteComment = async (searchPayload) => {
  try {
    const res = await commentsCollection.findOneAndDelete(searchPayload);
    if (!res) return;
    return res;
  } catch (error) {
    throw error;
  }
};
