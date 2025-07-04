import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import { CityService } from './service';
import { isAdmin } from '../middlewares';
import { logger } from '../utils/logger';

const cityService = Container.get<CityService>(CityService);
const route = Router();

route.get('/',
  isAdmin,  // isAdmin is a middleware for authZ
  async (_req: Request, res: Response, next: NextFunction) => {
    try {
      res.json(await cityService.getAll());
    } catch (err: unknown) {
      logger.error(err);
      next(err);
    }
  });

export default route;
