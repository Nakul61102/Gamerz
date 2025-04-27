import express from "express";
import {
  
  getProfile,
  updateProfile,
  deleteProfile,
} from "../controllers/profileController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// CRUD routes for profiles

router.get("/:id", authMiddleware, getProfile); // Read profile
router.put("/:id", authMiddleware, updateProfile); // Update profile
router.delete("/:id", authMiddleware, deleteProfile); // Delete profile

export default router;
