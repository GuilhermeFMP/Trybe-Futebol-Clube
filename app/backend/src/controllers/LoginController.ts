import { Request, Response } from 'express';
import { Authorized } from '../middlewares/validateToken';
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

  public static async role(req: Request, res: Response): Promise<void | Response> {
    const { email } = (req as Authorized).token;
    const role = await LoginService.role(email);
    if (typeof role !== 'string') {
      return res.status(statusCode.notFound).json({ role });
    }
    return res.status(statusCode.oK).json({ role });
  }
}

export default LoginController;
