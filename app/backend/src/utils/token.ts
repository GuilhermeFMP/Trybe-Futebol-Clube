import * as jwt from 'jsonwebtoken';

const secret: string = process.env.JWT_SECRET || 'jwt_secret';

const generateToken = (login: { email: string, password: string }) => {
  const token = jwt.sign(login, secret, {
    algorithm: 'HS256',
  });
  return token;
};

export default generateToken;
