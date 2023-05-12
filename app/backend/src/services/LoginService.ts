import { compareSync, hashSync } from 'bcryptjs';
import { generateToken } from '../utils/token';
import UserModel from '../database/models/Users';

class LoginService {
  public static async login(email: string, password: string):
  Promise<string | { status: number, message: string }> {
    const user = await UserModel.findOne({ where: { email } });
    if (!user || !(LoginService.compareHash(password, user.password))) {
      return { status: 401, message: 'Invalid email or password' };
    }
    const token = generateToken({ email, password });
    return token;
  }

  public static async role(email: string): Promise<string | { message: string }> {
    const user = await UserModel.findOne({ where: { email } });
    if (user) {
      return user.role;
    }
    return { message: 'user not found' };
  }

  private static hashPassword(password: string) {
    return hashSync(password);
  }

  private static compareHash(password: string, hash: string) {
    return compareSync(password, hash);
  }
}

export default LoginService;
