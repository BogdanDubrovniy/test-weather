import { Router } from 'express';
import temperatureService from './service';
import { isAdmin, queryValidatorMiddleware } from '../middlewares';
import { GetCandlestickDto } from './dto/candlestick-dto';

const route = Router();
route.get('/candle-sticks',
    isAdmin,  // is admin is a middleware for authZ
    queryValidatorMiddleware(GetCandlestickDto), // validation
    (req: any, res: any) => {
        res.json(temperatureService.getDataByCity(req.query.city));
    });

export default route;
