import { Request, Response, NextFunction } from 'express';
import { ErrorStatusCode, throwError } from '../helpers/errorHandler';

const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error('Error:', err);
  throwError(ErrorStatusCode.InternalServerError);
};

export default errorHandler;
