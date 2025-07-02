import 'reflect-metadata';
import { WebSocket } from 'ws';
import { Container } from 'typedi';
import configs from './config/variables';
import { TemperatureDto } from './statistic/types';
import { REDIS_CHANNEL, RedisService } from './utils';

const { socket: socketServer } = configs;
const redisServer = Container.get<RedisService>(RedisService);

const MAX_RECONNECT_ATTEMPTS = 5;
const RECONNECTION_DELAY = 30_000;

let reconnectAttempts = 0;
function connectWebSocket() {
    console.log(`trying to connect to WS Server ${socketServer.address}...`);
    const ws = new WebSocket(socketServer.address);

    ws.on('open', () => {
        console.log('Connected to WebSocket');
        reconnectAttempts = 0;
    });

    ws.on('message', async (message) => {
        try {
            // error handling:
            const parsedData = JSON.parse(message.toString());
            if ('error' in parsedData) throw new Error(parsedData.reason || 'Cannot get socketServer response');

            // data processing:
            const data: TemperatureDto = parsedData;
            console.log('Received WebSocket data:', data);
            await redisServer.getPublisher().publish(REDIS_CHANNEL, JSON.stringify(data));
        } catch (error) {
            console.error('Error on WebSocket message obtaining:', error);
        }
    });

    ws.on('error', (error) => {
        console.error('WebSocket error:', error);
    });

    ws.on('close', () => {
        console.info('Client was disconnected');

        if (reconnectAttempts < MAX_RECONNECT_ATTEMPTS) {
            reconnectAttempts++;
            console.log(`Reconnecting in ${RECONNECTION_DELAY / 1000}s (Attempt ${reconnectAttempts} of ${MAX_RECONNECT_ATTEMPTS})...`);
            setTimeout(connectWebSocket, RECONNECTION_DELAY);
        } else {
            console.error('Max reconnect attempts reached. Please check server availability.');
        }
    });

    return ws;
}

connectWebSocket();