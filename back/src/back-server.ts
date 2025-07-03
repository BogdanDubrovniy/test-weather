import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import { Container } from 'typedi';
import { errorMiddleware } from './middlewares';
import configs from './config/variables';
import seqConfig from './config/sequelize';
import statisticRoute from './statistic/route';
import cityRoute from './city/route';
import { StatisticService } from './statistic/service';
import { CANDLE_ENDPOINT, CITY_ENDPOINT } from './utils';
import { logger } from './utils/logger';

const app = express();
const { port = 3000 } = configs;
const statisticService = Container.get(StatisticService);

app.use(cors({ origin: '*' }));
app.use(`/${CANDLE_ENDPOINT}`, statisticRoute);
app.use(`/${CITY_ENDPOINT}`, cityRoute);
app.use(errorMiddleware);

app.listen(port, async () => {
  await seqConfig.authenticate();
  logger.info(`Server running on http://localhost:${port}`);
  statisticService.listenData();
});
