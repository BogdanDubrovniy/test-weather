import createLogger from 'pino';

export const logger = createLogger({
  level: 'debug',
  timestamp: true,
});
