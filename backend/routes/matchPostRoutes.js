import express from "express";
import { createMatchPost, getCommunityMatchPosts, joinMatchPost } from "../controllers/matchPostController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Route to create a match post
router.post("/", authMiddleware, createMatchPost);

// Route to get all match posts for a community
router.get("/:communityId", authMiddleware, getCommunityMatchPosts);

// Route to join a match post
router.post("/:matchId/join", authMiddleware, joinMatchPost);

export default router;
// This code defines the routes for match posts in a gaming community application.
// It includes a route to create a match post and another to retrieve all match posts for a specific community.
// The routes are protected by authentication middleware to ensure that only authenticated users can create or view match posts.
// The `createMatchPost` function handles the creation of a new match post, while the `getCommunityMatchPosts` function retrieves all match posts for a given community.
// The routes are defined using Express.js, and the `authMiddleware` is applied to ensure that only authenticated users can access these routes.
// The `createMatchPost` function expects a request body containing the community ID, user ID, game, preferred role, rank or level, and what the user is looking for.