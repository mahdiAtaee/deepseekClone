import { sign, verify } from 'jsonwebtoken'

export class TokenService {
    private readonly ACCESS_TOKEN_SECRET: string
    private readonly REFRESH_TOKEN_SECRET: string
    constructor() {
        this.ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET as unknown as string
        this.REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET as unknown as string
    }

    public generateAccessToken(payload: object) {
        return sign(payload, this.ACCESS_TOKEN_SECRET, { algorithm: 'HS256', expiresIn: '15m' })
    }

    public generateRefreshToken(payload: object) {
        return sign(payload, this.REFRESH_TOKEN_SECRET, { algorithm: 'HS256', expiresIn: '7d' })
    }

    public verifyAccessToken(token: string) {
        return verify(token, this.ACCESS_TOKEN_SECRET)
    }

    public verifyRefreshToken(token: string) {
        return verify(token, this.REFRESH_TOKEN_SECRET)
    }

    public reassignToken(refreshToken: string) {
        try {
            const payload = verify(refreshToken, this.REFRESH_TOKEN_SECRET) as any
            const newAccessToken = this.generateAccessToken({ id: payload.id })
            const newRefreshToken = this.generateRefreshToken({ id: payload.id })

            return { accessToken: newAccessToken, refreshToken: newRefreshToken }
        } catch (error) {
            throw new Error('Invalid refresh token')
        }
    }
}