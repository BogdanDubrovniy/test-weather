import { Sequelize } from 'sequelize-typescript';
import config from './variables';
import { Statistic } from '../statistic/model';
import { City } from '../city/model';

const sequelize = new Sequelize({
    database: config.sequelize.database,
    dialect: config.sequelize.dialect,
    username: config.sequelize.username,
    password: config.sequelize.password,
    port: config.sequelize.port,
    pool: {
      min: 0,
      max: 10,
    },
    models: [
        City,
        Statistic,
    ],
});

export default sequelize;
