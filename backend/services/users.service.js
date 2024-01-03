import { getUser } from "../models/user.model.js";

export const findUserByEmail = async (email) => {
  try {
    if (!email) {
      return;
    }
    const payload = {
      email,
    };
    return await getUser(payload);
  } catch (err) {
    throw err;
  }
};
