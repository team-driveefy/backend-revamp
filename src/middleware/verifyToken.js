import jwt from 'jsonwebtoken';
import { StatusCodes } from 'http-status-codes';

export const verifyToken = (req, res, next) => {
  const token = req.cookies.authToken;

  if (!token)
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: 'Access denied. No token provided.' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(StatusCodes.FORBIDDEN).json({ message: 'Invalid token.' });
  }
};

// TODO: set this cookie when make login api
// Set the cookie with options
//  res.cookie('authToken', token, {
//   httpOnly: true,
//   secure: true,
//   sameSite: 'strict',
//   maxAge: 24 * 60 * 60 * 1000,
// });
