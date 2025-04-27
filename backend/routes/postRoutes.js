import express from "express";
import {
  createPost,
  getAllPosts,
  deletePost,
  likePost,
  getUserPosts,
  getPostsByCommunity,
} from "../controllers/postController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Routes
router.post("/create", authMiddleware, createPost); // Create a post
router.get("/", authMiddleware, getAllPosts); // Fetch all posts
router.get("/userPost", authMiddleware, getUserPosts); // Fetch user posts
router.delete("/:postId", authMiddleware, deletePost); // Delete a post
router.post("/like/:postId", authMiddleware, likePost); // Like a post
router.get("/community/:communityId", authMiddleware, getPostsByCommunity); // Fetch posts by community

export default router;
