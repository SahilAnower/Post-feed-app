import {
  createAuthentication,
  findAuthentication,
  updateAuthentication,
} from "../models/authentication.model.js";
import { createUser } from "../models/user.model.js";
import { generateToken } from "../utils/jwt.util.js";
import { findUserByEmail } from "./users.service.js";
import bcrypt from "bcrypt";
import moment from "moment/moment.js";

export const authSignup = async (payload) => {
  try {
    const isUser = await findUserByEmail(payload.email);
    if (isUser) {
      throw new Error(
        JSON.stringify({
          userMessage: "User Already Exists",
          statusCode: 409,
        })
      );
    }

    const userDetails = await createUser(payload);
    if (!userDetails) {
      throw new Error("Unable to create User");
    }

    const userId = userDetails._id.toString();
    const newTokens = await generateAuthenticationTokens(userId);
    const resFromDb = await upsertAuthenticationInDb(
      userId,
      payload.email,
      payload.password,
      newTokens.refreshToken
    );
    if (!resFromDb) {
      throw new Error("Unable to upsert user authentication tokens");
    }
    return newTokens;
  } catch (error) {
    throw error;
  }
};

export const authSignin = async (payload) => {
  try {
    const { email, password } = payload;
    const isUser = await findUserByEmail(email);
    if (!isUser) {
      throw new Error(
        JSON.stringify({
          userMessage: "User not found",
          statusCode: 404,
        })
      );
    }
    const userId = await validateTokenCredentials(email, password);
    if (!userId) {
      throw new Error(
        JSON.stringify({
          userMessage: "Incorrect Password",
          statusCode: 401,
        })
      );
    }
    const newTokens = await generateAuthenticationTokens(userId);
    const resFromDb = await updateAuthenticationInDb(userId, {
      refreshToken: newTokens.refreshToken,
    });
    if (!resFromDb) {
      throw new Error("Unable to update user authentication tokens");
    }
    return newTokens;
  } catch (error) {
    throw error;
  }
};

export const generateAuthenticationTokens = async (userId) => {
  try {
    const tokenPayload = { userId };
    const accessToken = generateToken(tokenPayload, 60 * 60 * 24);
    const refreshToken = generateToken(tokenPayload, 12 * 60 * 60 * 24);
    return { accessToken, refreshToken };
  } catch (err) {
    throw err;
  }
};

export const upsertAuthenticationInDb = async (
  userId,
  email,
  password,
  refreshToken,
  mode
) => {
  try {
    if (!(userId && email && (password || mode) && refreshToken)) {
      return;
    }
    let encryptedPassword;
    if (password) {
      encryptedPassword = await bcrypt.hash(password, 10);
    }
    const payload = {
      userId,
      email,
      encryptedPassword,
      refreshToken,
      mode,
      createdAtUnix: moment.utc().format("X"),
      updatedAtUnix: moment.utc().format("X"),
    };
    const res = await createAuthentication(payload);

    if (res) {
      return res;
    }
    return;
  } catch (err) {
    throw err;
  }
};

export const validateTokenCredentials = async (email, password) => {
  try {
    if (!(email && password)) {
      return;
    }
    const userCredentials = await findAuthentication({ email });

    if (!userCredentials) {
      return;
    }

    let check = false;

    if (userCredentials.encryptedPassword) {
      check = await bcrypt.compare(password, userCredentials.encryptedPassword);
    } else {
      check = userCredentials.password === password;
    }

    if (!check) return;

    if (!(userCredentials && userCredentials.userId)) {
      throw new Error("Unable to validate user credentials");
    }
    return userCredentials.userId;
  } catch (error) {
    throw error;
  }
};

export const updateAuthenticationInDb = async (userId, payload) => {
  try {
    if (!userId) {
      return;
    }
    payload.updatedAtUnix = moment.utc().format("X");
    const res = await updateAuthentication(userId, payload);
    if (!res) {
      return;
    }
    return res;
  } catch (error) {
    throw error;
  }
};
