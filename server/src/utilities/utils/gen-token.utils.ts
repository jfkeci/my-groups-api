import * as crypto from 'crypto';
import * as jwt from 'jsonwebtoken';

export const generateToken = () => {
  return crypto.randomBytes(20).toString('hex');
};

export const generateJwt = async (data: { id: number; username: string }) => {
  return jwt.sign(data, 'temp-server-secret', {
    expiresIn: '30d',
  });
};
