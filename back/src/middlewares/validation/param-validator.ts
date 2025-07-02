import { Request, Response, NextFunction } from 'express';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { BAD_REQUEST_CODE } from '../../constants';
import { BadRequestError } from '../../utils';

export function paramValidatorMiddleware<T>(clazz: new () => T) {
    return async (req: Request, res: Response, next: NextFunction) => {
        const input = plainToClass(clazz, req.params);
        const errors = await validate(input as object);

        if (errors.length > 0) {
            const errorMessages = errors.map(error => Object.values(error.constraints || {}).join(', '));
            const errorBody = new BadRequestError('Wrong data', { errors: errorMessages });
            res.status(BAD_REQUEST_CODE).json(errorBody);
            next(errorBody);
        } else next();
    };
}