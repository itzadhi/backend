import express from 'express';
import {
  shortenUrl,
  redirectUrl,
  getUrls,
} from '../controllers/urlController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// @desc  Create the shorten url
router.route('/create').post(protect, shortenUrl);

// @desc  get all urls
router.route('/all').get(protect, getUrls);

// @desc  redirect to original url
router.route('/new/:shortenurl').get(redirectUrl);

export default router;
