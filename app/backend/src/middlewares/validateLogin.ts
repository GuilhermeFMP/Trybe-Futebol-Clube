import { Request, Response, NextFunction } from 'express';
import statusCode from '../utils/statusCode';

async function validateLogin(req: Request, res: Response, next: NextFunction) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(statusCode.badRequest).json({ message: 'All fields must be filled' });
  }
  next();
}

export default validateLogin;
