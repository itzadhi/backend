import express from 'express';
import { getUrlClicks } from '../controllers/clickController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// @desc  get all urls
router.route('/url/count/:id').get(protect, getUrlClicks);

export default router;
