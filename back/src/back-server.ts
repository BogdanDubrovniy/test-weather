import express from 'express';
import cors from 'cors';
import temperatureRoute from './temperature/route';
import { connectWebSocket } from './utils/socket';
import configs from './config';

const app = express();
const { port = 3000 } = configs;

app.use(cors({ origin: '*' }));
app.use('/', temperatureRoute);

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
    connectWebSocket();
});
