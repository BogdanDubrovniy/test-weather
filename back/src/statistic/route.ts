import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import { StatisticService } from './service';
import { isAdmin, paramValidatorMiddleware } from '../middlewares';
import { GetCandlestickDto } from './dto/candlestick-dto';
import { logger } from '../utils/logger';

const statisticService = Container.get<StatisticService>(StatisticService);
const route = Router();

route.get('/:id',
  isAdmin,  // isAdmin is a middleware for authZ
  paramValidatorMiddleware(GetCandlestickDto), // validation
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.json(await statisticService.getDataById(req.params.id as string));
    } catch (err: unknown) {
      logger.error(err);
      next(err);
    }
  });

export default route;
