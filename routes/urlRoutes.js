import express from 'express';
import {
  shortenUrl,
  redirectUrl,
  getUrls,
  getUrl,
  deleteUrl,
} from '../controllers/urlController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// @desc  Create the shorten url
router.route('/create').post(protect, shortenUrl);

// @desc  get all urls
router.route('/all').get(protect, getUrls);

// @desc  get individual url
router.route('/:id').get(protect, getUrl);

// @desc  delete url
router.route('/:id').delete(protect, deleteUrl);

// @desc  redirect to original url
// router.route('/:shortenurl').get(redirectUrl);

export default router;
