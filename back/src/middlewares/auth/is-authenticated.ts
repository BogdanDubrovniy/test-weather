import { Request, Response, NextFunction } from 'express';
import { UnauthorizedError } from '../../utils';
import { UNAUTHORIZED_CODE } from '../../constants';

export const isAuthenticated = async (req: Request, res: Response) => {
    try {
        // Where Authorization headers would be checked:
        const bearerToken = req.headers.authorization?.split(' ')[1] as string;
        if (!bearerToken) throw new UnauthorizedError('No token provided');
    } catch (err: unknown) {
        console.error(err);

        if (err instanceof UnauthorizedError) res.status(err.code).json(err);
        else res.status(UNAUTHORIZED_CODE).json({
            message: 'Cannot Check Admin',
            code: UNAUTHORIZED_CODE,
        });
    }
}
