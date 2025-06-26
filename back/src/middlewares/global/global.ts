import { NextFunction, Request, Response} from 'express';
import { CustomError } from '../../utils/errors/custom-error';

export function errorMiddleware(
    err: CustomError,
    _req: Request,
    res: Response,
    _next: NextFunction
) {

    console.error('Unhandled error:', err.stack);
    res.status(err.code || 500).json({
        status: err.code || 500,
        error: err.message,
        data: err.details,
    });
}