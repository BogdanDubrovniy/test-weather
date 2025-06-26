import { Request, Response, NextFunction } from 'express';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';

export function queryValidatorMiddleware<T>(type: new () => T) {
    return async (req: Request, res: Response, next: NextFunction) => {
        const input = plainToClass(type, req.query);
        const errors = await validate(input as object);

        if (errors.length > 0) {
            const errorMessages = errors.map(error => Object.values(error.constraints || {}).join(', '));
            res.status(400).json({ errors: errorMessages });
            next({ errors: errorMessages });
        } else next();
    };
}