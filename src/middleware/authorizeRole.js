import { StatusCodes } from 'http-status-codes';

export const authorizeRole = (requiredRole) => (req, res, next) => {
  if (req.user.role !== requiredRole) {
    return res.status(StatusCodes.FORBIDDEN).json({ message: `Access denied` });
  }
  next();
};
