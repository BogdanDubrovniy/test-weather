import { Service } from 'typedi';
import { createClient } from 'redis';
import configs from '../../config/variables';

@Service()
export class RedisService {
    private client: any;
    constructor() {
        this.generateRedisClient().then(() => console.log('Redis server was generated'));
    }

    public getPublisher() {
        const client = this.client.duplicate();
        client.connect();
        return client;
    }

    public getSubscriber() {
        const client = this.client.duplicate();
        client.connect();
        return client;
    }

    private async generateRedisClient() {
        if (!this.client) {
            const url = `redis://${configs.redis.password || ''}@${configs.redis.host}:${configs.redis.port}`;
            this.client = await createClient({ url })
                .on('error', (err: unknown) => {
                    console.log("Redis Client Error", err);
                    throw err;
                })
                .connect();
        }
    }
}
