import { UserSchema } from "../schemas/User.js";
import mongodbConnection from "../utils/mongo-db.util.js";

const dbName = process.env.DB;

const feedAppDb = mongodbConnection.useDb(dbName);

const usersCollection = feedAppDb.model("User", UserSchema);

export const createUser = async (payload) => {
  try {
    const res = await usersCollection.create(payload);
    if (!res) return;
    return res;
  } catch (error) {
    throw error;
  }
};

export const getUser = async (searchPayload, filterPayload = null) => {
  try {
    const res = await usersCollection.findOne(searchPayload, filterPayload);
    if (!res) return;
    return res;
  } catch (error) {
    throw error;
  }
};

export const updateUser = async (searchPayload, updatePayload) => {
  try {
    const res = await usersCollection.findOneAndUpdate(
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
