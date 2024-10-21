import { StatusCodes } from 'http-status-codes';
import {
  body,
  param,
  query,
  header,
  validationResult,
} from 'express-validator';

export const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(StatusCodes.BAD_REQUEST).json({ errors: errors.array() });
  }
  next();
};

export const JwtValidation = [
  header('Authorization').isJWT().withMessage('Invalid or missing JWT token'),
];
