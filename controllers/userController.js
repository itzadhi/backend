import asyncHandler from '../middleware/asyncHandler.js';
import User from '../models/User.js';
import generateToken from '../utils/generateToken.js';
import { sendActivationMail } from '../utils/sendActivationMail.js';

// @desc    Register
// @route   POST /user/register
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  const userName = email.split('@');

  const user = await User.create({
    firstName,
    lastName,
    userName: userName?.[0],
    email,
    password,
  });

  if (user) {
    const name = `${user.firstName}  ${user.lastName}`;
    const email = user.email;
    const userId = user._id.toString();

    sendActivationMail(name, email, userId);

    res.status(201).json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      isEmailVerified: user.isEmailVerified,
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// @desc    Login & get token
// @route   POST /user/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    if (!user?.isEmailVerified) {
      res.send(
        'The account is inactive, please check your mail and verify your email.'
      );

      const name = `${user.firstName}  ${user.lastName}`;
      const email = user.email;
      const userId = user._id.toString();

      sendActivationMail(name, email, userId);
    } else {
      generateToken(res, user._id);

      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isEmailVerified: user.isEmailVerified,
      });
    }
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

const verifiedUser = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const user = await User.findById(id);

  if (user) {
    user.isEmailVerified = true;

    await user.save();

    generateToken(res, user._id);

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isEmailVerified: user.isEmailVerified,
    });
  } else {
    res.status(404);
    throw new Error(
      'User not found, please register your details in register page'
    );
  }
});

// @desc    Logout user and clear cookie
// @route   POST /user/logout
// @access  Public
const logoutUser = (req, res) => {
  res.clearCookie('jwt');
  res.status(200).json({ message: 'Logged out successfully' });
};

export { registerUser, loginUser, verifiedUser, logoutUser };
