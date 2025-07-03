import { Request, Response } from 'express';
import { CustomError } from '../../utils/errors/custom-error';
import { logger } from '../../utils/logger';

export function errorMiddleware(
  err: CustomError,
  _req: Request,
  res: Response,
) {

  logger.error('Unhandled error:', err.stack);
  res.status(err.code || 500).json({
    status: err.code || 500,
    error: err.message,
    data: err.details,
  });
}
