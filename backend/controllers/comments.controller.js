import express from "express";
import {
  createComment,
  deleteComment,
  getAllComments,
  updateComment,
} from "../models/comment.model.js";

const router = express.Router();

router.post("/", async (req, res, next) => {
  try {
    const response = await createComment(req.body);
    return res.status(200).json(response);
  } catch (error) {
    throw error;
  }
});

router.get("/", async (req, res, next) => {
  try {
    const response = await getAllComments();
    return res.status(200).json(response);
  } catch (error) {
    throw error;
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const response = await updateComment({ _id: id }, req.body);
    return res.status(200).json(response);
  } catch (error) {
    throw error;
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const response = await deleteComment({ _id: id });
    if (response) {
      return res
        .status(200)
        .json({ message: `Comment-${id} deleted successfully` });
    }
    return res.status(200).json({ message: "Cannot delete comment" });
  } catch (error) {
    throw error;
  }
});

export default router;
