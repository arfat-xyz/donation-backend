import { NextFunction, Request, Response } from 'express';
import { Secret } from 'jsonwebtoken';
import httpStatus from 'http-status';
import ApiError from '../errors/ApiErrors';
import { JWTHelpers } from '../helpers/jwtHelpers';
import config from '../config';

export const auth =
  () => async (req: Request, res: Response, next: NextFunction) => {
    try {
      // get authorization token
      const token = req.headers.authorization;
      if (!token) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'You are not authorized');
      }

      let verifiedUser = null;
      verifiedUser = JWTHelpers.verifyToken(
        token as string,
        config.jwt_secret as Secret,
      );
      req.user = verifiedUser;
      console.log(verifiedUser);
      next();
    } catch (error) {
      next(error);
    }
  };
