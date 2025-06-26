import { WebSocket } from 'ws';
import temperatureService from '../temperature/service';
import { TemperatureDto } from '../temperature/types';
import configs from '../config';

const { socket } = configs;
const MAX_RECONNECT_ATTEMPTS = 5;
const RECONNECTION_DELAY = 30_000;

let reconnectAttempts = 0;
export function connectWebSocket() {
    console.log(`trying to connect to WS Server ${socket.address}...`);
    const ws = new WebSocket(socket.address);

    ws.on('open', () => {
        console.log('Connected to WebSocket');
        reconnectAttempts = 0;
    });

    ws.on('message', (message) => {
        try {

            // return temperatureService.processTemperatureData({ // todo temp!
            //     city: 'Berlin',
            //     temperature: Math.round((Math.random() * (2.02 + 2.02) - 2.02) * 100) / 100,
            //     timestamp: new Date().toISOString(),
            // });

            // error handling:
            const parsedData = JSON.parse(message.toString());
            if ('error' in parsedData) throw new Error(parsedData.reason || 'Cannot get socket response');

            // data processing:
            const data: TemperatureDto = parsedData;
            console.log('Received WebSocket data:', data);
            temperatureService.processTemperatureData(data);
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