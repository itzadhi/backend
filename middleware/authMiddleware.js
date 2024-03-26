import jwt from 'jsonwebtoken';
import asyncHandler from './asyncHandler.js';
import User from '../models/User.js';

// User must be authenticated
const protect = asyncHandler(async (req, res, next) => {
  let token;

  console.log('111', token);

  // Get JWT from the cookie
  token = req.cookies.jwt;

  console.log('233444', token);

  if (token) {
    try {
      //Get the User Object
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      console.log('33', decoded);

      req.user = await User.findById(decoded.userId).select('-password');

      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error('Not authorized, token failed');
    }
  } else {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
});

export { protect };
