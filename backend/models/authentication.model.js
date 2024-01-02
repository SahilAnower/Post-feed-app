import mongodbConnection from "../utils/mongo-db.util";
import { AuthenticationSchema } from "../schemas/Authentication";

const dbName = process.env.DB;

const feedAppDb = mongodbConnection.useDb(dbName);

const authenticationCollection = feedAppDb.model(
  "Authentication",
  AuthenticationSchema
);

export const createAuthentication = async (payload) => {
  try {
    const res = await authenticationCollection.create(payload);
    if (!res) return;
    return res;
  } catch (error) {
    throw error;
  }
};

export const updateAuthentication = async (userId, payload) => {
  try {
    const res = await authenticationCollection.findOneAndUpdate(
      { userId },
      { $set: payload },
      { new: true }
    );
    if (res) {
      return res;
    }
    return;
  } catch (err) {
    throw err;
  }
};

export const findAuthentication = async (payload) => {
  try {
    const res = await authenticationCollection.findOne(payload);
    if (!res) return;
    return res;
  } catch (error) {
    throw error;
  }
};
