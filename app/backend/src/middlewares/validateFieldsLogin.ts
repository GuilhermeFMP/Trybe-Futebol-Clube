import { Request, Response, NextFunction } from 'express';
import statusCode from '../utils/statusCode';

async function validateFieldsLogin(req: Request, res: Response, next: NextFunction) {
  const { email, password } = req.body;
  const type = typeof email === 'string' && typeof password === 'string';
  if (!type) {
    return res.status(statusCode.unauthorized).json({ message: 'Invalid email or password' });
  }
  const passwordLength = password.length < 6;
  const regex = /^\S+@\S+\.\S+$/;
  if (passwordLength || !regex.test(email)) {
    return res.status(statusCode.unauthorized).json({ message: 'Invalid email or password' });
  }
  next();
}

export default validateFieldsLogin;
