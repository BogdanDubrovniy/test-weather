import { Server } from './types';

const configs: Server = {
    port: Number(process.env.PORT!),
    socket: {
        address: process.env.WS_URL!,
    },
    sequelize: {
        dialect: 'postgres',
        database: process.env.DB_NAME!,
        host: process.env.DB_HOST!,
        password: process.env.DB_PASSWORD!,
        username: process.env.DB_USERNAME!,
        port: Number(process.env.DB_PORT!),
    },
    redis: {
        host: process.env.REDIS_HOST!,
        password: process.env.REDIS_PASSWORD!,
        port: Number(process.env.REDIS_PORT!),
    },
};

export default configs;