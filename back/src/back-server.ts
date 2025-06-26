import express from 'express';
import cors from 'cors';
import temperatureRoute from './temperature/route';
import { connectWebSocket } from './utils';
import configs from './config';
import { errorMiddleware } from './middlewares';

const app = express();
const { port = 3000 } = configs;

app.use(cors({ origin: '*' }));
app.use('/', temperatureRoute);
app.use(errorMiddleware);

app.listen(port, () => { // todo!
    console.log(`Server running on http://localhost:${port}`);
    connectWebSocket();
});
