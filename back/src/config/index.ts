import { Server } from './types';

const configs: Server = {
    port: Number(process.env.PORT!),
    socket: {
        address: process.env.WS_URL!,
    },
};

export default configs;