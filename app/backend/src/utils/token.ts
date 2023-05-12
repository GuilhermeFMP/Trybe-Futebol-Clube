import * as jwt from 'jsonwebtoken';

const secret: string = process.env.JWT_SECRET || 'jwt_secret';

type payload = { email: string, password: string };

export const generateToken = (login: payload) => {
  const token = jwt.sign(login, secret, {
    algorithm: 'HS256',
  });
  return token;
};

export const verifyToken = (token: string): payload => {
  const decoded = jwt.verify(token, secret);
  return decoded as payload;
};
