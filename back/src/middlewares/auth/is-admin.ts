import { Request, Response, NextFunction } from 'express';

export const isAdmin = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // some check,
        // if we check user token and his permissions, we can deny or allow to use this endpoint next(errorInstance);
        next();
    } catch (err: unknown) {
        console.error(err);
        res.status(403).json({
            message: 'Cannot Check Admin',
            error: err,
        });
    }
}
