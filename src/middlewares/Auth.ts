import { NextFunction, Request, Response } from "express";
import { AwilixContainer } from "awilix";
import { TokenService } from "../services/TokenService";


interface ScopedRequest extends Request {
    user: any;
    container: AwilixContainer
}

export function Auth(req: ScopedRequest, res: Response, next: NextFunction) {
    try {
        const tokenService: TokenService = req.container.resolve('tokenService')
        const token = req.headers.authorization

        if (!token) {
            return res.status(401).send({
                success: false,
                message: "Access Token Missing!"
            })
        }
        const user = tokenService.verifyAccessToken(token)
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid token"
            });
        }
        console.log('auth middleware', user);
        
        req.user = user
        next()
    } catch (error) {
        console.error("auth error:", error);
        return res.status(401).json({
            success: false,
            message: "Unauthorized"
        });
    }
}