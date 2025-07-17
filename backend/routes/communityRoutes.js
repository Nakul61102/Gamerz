import express from 'express';
import {
  createCommunity,
  toggleCommunityMembership,
  getCommunityById,
  getAllCommunities,
  getUserCommunities,
  deleteCommunity
} from '../controllers/communityController.js';
import authMiddleware from '../middleware/authMiddleware.js';
const router = express.Router();

// Create a community
router.post('/create', authMiddleware, createCommunity);

router.get("/userCommunity", authMiddleware, getUserCommunities); // Fetch all posts
// Join a community
router.post('/join/:communityId', authMiddleware, toggleCommunityMembership);

// Get details of a specific community
router.get('/:id', authMiddleware, getCommunityById);

// Delete a community
router.delete('/:id', authMiddleware, deleteCommunity);

// Get all communities
router.get('/', authMiddleware, getAllCommunities);






export default router;