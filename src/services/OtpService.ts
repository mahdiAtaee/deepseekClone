import { RedisClientType } from 'redis'

export class OtpService {
    private readonly redisClient: RedisClientType
    constructor({ redis }: { redis: RedisClientType }) {
        this.redisClient = redis
    }
    public async setOtp(email: string, code: string) {
        await this.redisClient.set(`otp:${email}`, code, { EX: 300 })
    }
    public async verifyOtp(email: string, code: string) {
        const stored = await this.redisClient.get(`otp:${email}`);
        return stored === code;
    }
}