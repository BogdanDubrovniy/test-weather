import { Request, Response, NextFunction } from 'express';

export const isAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Where Authorization headers would be checked:
        const bearerToken = req.headers.authorization?.split(' ')[1] as string;
        if (!bearerToken) throw new Error('No token provided');
        next();
    } catch (err: unknown) {
        console.error(err);
        res.status(401).json({
            message: 'Cannot Check Admin',
            error: err,
        });
    }
}
