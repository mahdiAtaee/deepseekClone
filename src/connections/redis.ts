import { createClient, RedisClientType } from 'redis';

export default async function createRedisClient(): Promise<RedisClientType> {
    const client: RedisClientType = createClient({
        url:process.env.REDIS_URL
    });

    client.on('error', (err) => console.error('❌ Redis error:', err));
    await client.connect();

    console.log('✅ Redis connected');
    return client;
}