import express from 'express';
import {
  loginUser,
  logoutUser,
  registerUser,
  verifiedUser,
} from '../controllers/userController.js';

const router = express.Router();

// @desc  Register
router.route('/register').post(registerUser);

// @desc  Login
router.route('/login').post(loginUser);

// @desc  verifiy user
router.route('/verify-email/:id').get(verifiedUser);

// @desc  Logout
router.post('/logout', logoutUser);

export default router;
