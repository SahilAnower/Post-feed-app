import express from "express";
import {
  createPost,
  deletePost,
  getAllPosts,
  updatePost,
} from "../models/post.model.js";
import {
  commentsCollection,
  postsCollection,
} from "../utils/collections.util.js";
import { deleteComment, updateComment } from "../models/comment.model.js";

const router = express.Router();

router.post("/", async (req, res, next) => {
  try {
    req.body.userId = req.userId;
    const response = await createPost(req.body);
    return res.status(200).json(response);
  } catch (error) {
    next(error);
  }
});

router.get("/", async (req, res, next) => {
  try {
    const response = await getAllPosts();
    return res.status(200).json(response);
  } catch (error) {
    next(error);
  }
});

router.post("/post/:id/comment", async (req, res, next) => {
  try {
    const comment = await commentsCollection.create({
      content: req.body.content,
      post: req.params.id,
    });
    // console.log("here");
    const postRelated = await postsCollection.findById(req.params.id);
    postRelated.comments.push(comment);
    const updatedPost = await postRelated.save();
    return res.status(200).json(updatedPost);
  } catch (error) {
    next(error);
  }
});

router.put("/post/:id/comment/:cid", async (req, res, next) => {
  try {
    const postId = req.params.id;
    const commentId = req.params.cid;
    const postRelated = await postsCollection.findById(postId);
    const commentRelated = postRelated.comments.filter(
      (comment) => comment._id == commentId
    )[0];
    if (!commentRelated) {
      throw new Error(
        `No comment with ${commentId} exist in this post ${postId}`
      );
    }
    const upatedComment = await updateComment(
      {
        _id: commentId,
      },
      req.body
    );
    return res.status(200).json(upatedComment);
  } catch (error) {
    next(error);
  }
});

router.delete("/post/:id/comment/:cid", async (req, res, next) => {
  try {
    const postId = req.params.id;
    const commentId = req.params.cid;
    const postRelated = await postsCollection.findById(postId);
    const commentIndex = postRelated.comments.findIndex(
      (comment) => comment._id.toString() === commentId
    );
    if (commentIndex !== -1) {
      postRelated.comments.splice(commentIndex, 1);
    } else {
      throw new Error("Comment not found in this post.");
    }
    await postRelated.save();
    await deleteComment({ _id: commentId });
    return res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    // const userId = req.userId;
    const response = await updatePost({ _id: req.params.id }, req.body);
    return res.status(200).json(response);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const response = await deletePost({ _id: req.params.id });
    if (response) {
      return res
        .status(200)
        .json({ message: `Post-${id} deleted successfully` });
    }
    return res.status(200).json({ message: "Cannot delete post" });
  } catch (error) {
    next(error);
  }
});

export default router;
