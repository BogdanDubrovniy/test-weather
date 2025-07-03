import { Request, Response, NextFunction } from 'express';
import { FORBIDDEN_CODE } from '../../constants';
import { ForbiddenError } from '../../utils';
import { logger } from '../../utils/logger';

export const isAdmin = (_req: Request, res: Response, next: NextFunction) => {
  try {
    // some check,
    // if we check user token and his permissions, we can deny or allow to use this endpoint next(errorInstance);
    // throw new ForbiddenError('You are prohibited to use this endpoint');

    next();
  } catch (err: unknown) {
    logger.error(err);
    if (err instanceof ForbiddenError) res.status(err.code).json(err);
    else res.status(FORBIDDEN_CODE).json({ message: 'Cannot Check Admin', code: FORBIDDEN_CODE });
  }
};
