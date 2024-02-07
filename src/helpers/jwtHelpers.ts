import jwt, { JwtPayload, Secret } from 'jsonwebtoken';

const createToken = (
  data: Record<string, unknown>,
  secret: Secret,
  expire: string,
): string => {
  return jwt.sign(data, secret, { expiresIn: expire });
};

const verifyToken = (token: string, secret: Secret): JwtPayload => {
  return jwt.verify(token, secret) as JwtPayload;
};
export const JWTHelpers = { createToken, verifyToken };
