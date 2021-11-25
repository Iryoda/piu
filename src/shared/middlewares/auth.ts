import auth from '@config/auth';
import AppError from '@shared/errors';
import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

interface IPayload {
  sub: string;
}

const ensureAuth = async (req: Request, _: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) throw new AppError('Token is missing', 401);

  const [, token] = authHeader.split(' ');

  try {
    const { sub: user_id } = verify(token, auth.secret!) as IPayload;

    if (!user_id) {
      throw new AppError('Token is not Valid', 401);
    }

    req.user = {
      id: user_id,
    };

    next();
  } catch (e) {
    throw new AppError('Not a valid token', 401);
  }
};

export default ensureAuth;
