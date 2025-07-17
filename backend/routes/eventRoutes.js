import express from "express";
import { createEvent, getCommunityEvents, joinEvent } from "../controllers/eventController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, createEvent);
router.get("/:communityId", getCommunityEvents);
router.post("/join/:eventId", authMiddleware, joinEvent);

export default router;
