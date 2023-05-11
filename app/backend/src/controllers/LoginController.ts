import { Request, Response } from 'express';
import LoginService from '../services/LoginService';
import statusCode from '../utils/statusCode';

class LoginController {
  constructor(private loginService = new LoginService()) {}
  public static async login(req: Request, res: Response): Promise<void | Response> {
    const { email, password } = req.body;
    const token = await LoginService.login(email, password);
    if (typeof token !== 'string') {
      return res.status(token.status).json({ message: token.message });
    }
    return res.status(statusCode.oK).json({ token });
  }
}

export default LoginController;
