import express from 'express';
import {
  createCommunity,
  toggleCommunityMembership,
  getCommunityDetails,
  getAllCommunities,
  getUserCommunities
} from '../controllers/communityController.js';
import authMiddleware from '../middleware/authMiddleware.js';
const router = express.Router();

// Create a community
router.post('/create', authMiddleware, createCommunity);

router.get("/userCommunity", authMiddleware, getUserCommunities); // Fetch all posts
// Join a community
router.post('/join/:communityId', authMiddleware, toggleCommunityMembership);

// Get details of a specific community
router.get('/:communityId', authMiddleware, getCommunityDetails);

// Get all communities
router.get('/', authMiddleware, getAllCommunities);






export default router;