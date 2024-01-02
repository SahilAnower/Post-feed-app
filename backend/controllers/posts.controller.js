import express from "express";
import {
  createPost,
  deletePost,
  getAllPosts,
  updatePost,
} from "../models/post.model";

const router = express.Router();

router.post("/", async (req, res, next) => {
  try {
    req.body.userId = req.userId;
    const response = await createPost(req.body);
    return res.status(200).json(response);
  } catch (error) {
    throw error;
  }
});

router.get("/", async (req, res, next) => {
  try {
    const response = await getAllPosts();
    return res.status(200).json(response);
  } catch (error) {
    throw error;
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    // const userId = req.userId;
    const response = await updatePost({ _id: id }, req.body);
    return res.status(200).json(response);
  } catch (error) {
    throw error;
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const response = await deletePost({ _id: id });
    if (response) {
      return res
        .status(200)
        .json({ message: `Post-${id} deleted successfully` });
    }
    return res.status(200).json({ message: "Cannot delete post" });
  } catch (error) {
    throw error;
  }
});

export default router;
