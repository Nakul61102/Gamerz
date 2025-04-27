import express from 'express';
import { registerGamer, loginGamer } from '../controllers/authController.js';

const router = express.Router();

// Register a new gamer
router.post('/register', registerGamer);

// Login a gamer
router.post('/login', loginGamer);

export default router;