import {Router, Request, Response, NextFunction} from 'express';
import temperatureService from './service';
import { isAdmin, queryValidatorMiddleware } from '../middlewares';
import { GetCandlestickDto } from './dto/candlestick-dto';
import { City } from './types';

const route = Router();
route.get('/candle-sticks',
    isAdmin,  // isAdmin is a middleware for authZ
    queryValidatorMiddleware(GetCandlestickDto), // validation
    (req: Request, res: Response, next: NextFunction) => {
        try {
            res.json(temperatureService.getDataByCity(req.query.city as City));
        } catch (err: unknown) {
            console.error(err);
            next(err);
        }
    });

export default route;
