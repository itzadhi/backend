import express from 'express';
import {
  loginUser,
  logoutUser,
  registerUser,
} from '../controllers/userController.js';

const router = express.Router();

// @desc  Register
router.route('/register').post(registerUser);

// @desc  Login
router.route('/login').post(loginUser);

// @desc  Logout
router.post('/logout', logoutUser);

export default router;
