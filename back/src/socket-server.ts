import 'reflect-metadata';
import { WebSocket } from 'ws';
import { Container } from 'typedi';
import configs from './config/variables';
import { TemperatureDto } from './statistic/types';
import { REDIS_CHANNEL, RedisService } from './utils';
import { logger } from './utils/logger';

const { socket: socketServer } = configs;
const redisServer = Container.get<RedisService>(RedisService);

const MAX_RECONNECT_ATTEMPTS = 5;
const RECONNECTION_DELAY = 30_000;

let reconnectAttempts = 0;

function connectWebSocket() {
  logger.info(`trying to connect to WS Server ${socketServer.address}...`);
  const ws = new WebSocket(socketServer.address);

  ws.on('open', () => {
    logger.info('Connected to WebSocket');
    reconnectAttempts = 0;
  });

  ws.on('message', async (message) => {
    try {
      // error handling:
      const parsedData = JSON.parse(message.toString());
      if ('error' in parsedData) throw new Error(parsedData.reason || 'Cannot get socketServer response');

      // data processing:
      const data: TemperatureDto = parsedData;
      logger.info('Received WebSocket data:', data);
      await redisServer.getPublisher().publish(REDIS_CHANNEL, JSON.stringify(data));
    } catch (error) {
      logger.error(error, 'Error on WebSocket message obtaining:');
    }
  });

  ws.on('error', (error) => {
    logger.error(error, 'WebSocket error:');
  });

  ws.on('close', () => {
    logger.info('Client was disconnected');

    if (reconnectAttempts < MAX_RECONNECT_ATTEMPTS) {
      reconnectAttempts++;
      logger.info(`Reconnecting in ${RECONNECTION_DELAY / 1000}s (Attempt ${reconnectAttempts} of ${MAX_RECONNECT_ATTEMPTS})...`);
      setTimeout(connectWebSocket, RECONNECTION_DELAY);
    } else {
      logger.error('Max reconnect attempts reached. Please check server availability.');
    }
  });

  return ws;
}

connectWebSocket();
