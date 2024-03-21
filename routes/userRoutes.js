import express from 'express';
import {
  forgotPassword,
  loginUser,
  logoutUser,
  newPassword,
  registerUser,
  verifiedUser,
} from '../controllers/userController.js';

const router = express.Router();

// @desc  Register
router.route('/register').post(registerUser);

// @desc  Login
router.route('/login').post(loginUser);

// @desc  verifiy user
router.route('/verify-email').put(verifiedUser);

// @desc  New Password
router.route('/new-password').put(newPassword);

// @desc  Forgot Password
router.route('/forgot-password').put(forgotPassword);

// @desc  Logout
router.post('/logout', logoutUser);

export default router;
