import AppError from '@shared/errors';
import { NextFunction, Request, Response } from 'express';

const handleError = (
  err: Error,
  _req: Request,
  response: Response,
  _next: NextFunction,
): Response => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  console.log(err);

  return response.status(500).json({
    status: 'error',
    message: `'Internal Server Error - ${err}'`,
  });
};

export default handleError;
