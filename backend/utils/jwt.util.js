import jwt from "jsonwebtoken";

const secretKey = process.env.JWT_SECRET_KEY;

export const generateToken = (payload, expireInSeconds) => {
  try {
    if (!payload) {
      return;
    }
    return jwt.sign(payload, secretKey, {
      expiresIn: parseInt(expireInSeconds, 10) || 900,
    });
  } catch (err) {
    throw err;
  }
};

export const validateToken = (token) => {
  try {
    const res = jwt.verify(token, secretKey);
    if (!res) {
      return;
    }
    return res;
  } catch (err) {
    return;
  }
};
