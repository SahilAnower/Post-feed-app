import express from "express";
import { authSignin, authSignup } from "../services/authentication.service";
import { findUserByEmail } from "../services/users.service";

const router = express.Router();

router.post("/signup", async (req, res, next) => {
  try {
    const response = await authSignup(req.body);
    return res.status(200).json(response);
  } catch (error) {
    next(error);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const response = await authSignin(req.body);
    return res.status(200).json(response);
  } catch (error) {
    throw error;
  }
});

router.get("/user", async (req, res, next) => {
  try {
    const { email } = req.query;
    if (!email) {
      throw new Error("Missing Query parameter - email");
    }
    const isUser = await findUserByEmail(email);
    if (!isUser) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).send({ message: "User found" });
  } catch (error) {
    throw error;
  }
});

export default router;
