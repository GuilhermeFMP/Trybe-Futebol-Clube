import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/token';
import statusCode from '../utils/statusCode';

export type Authorized = Request & {
  token: {
    email: string
  }
};

async function validateToken(req: Request, res: Response, next: NextFunction) {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(statusCode.unauthorized).json({ message: 'Token not found' });
  }
  try {
    const decoded = verifyToken(authorization);
    (req as Authorized).token = {
      email: decoded.email,
    };
  } catch (error) {
    return res.status(statusCode.unauthorized).json({ message: 'Token must be a valid token' });
  }
  next();
}

export default validateToken;
