import { NextFunction, Request, Response } from "express";
import { OtpService } from "../../../services/OtpService";
import IMailer from "../../../services/notification/Mail/contracts/IMailer";
import { AuthService } from "../repositories/AuthService";
import { TokenService } from "../../../services/TokenService";


export class RegisterController {
    private readonly OTPService: OtpService
    private readonly MAILService: IMailer
    private readonly AuthService: AuthService
    private readonly TokenService: TokenService
    constructor({ otpService, mailService, authService, tokenService }: { otpService: OtpService, mailService: IMailer, authService: AuthService, tokenService: TokenService }) {
        this.OTPService = otpService
        this.MAILService = mailService
        this.AuthService = authService
        this.TokenService = tokenService
    }

    public async createUser(req: Request, res: Response, next: NextFunction) {
        const { email } = req.body
        const code = Math.floor(100000 + Math.random() * 900000).toString();

        console.log(email, code);

        const otp = await this.OTPService.setOtp(email, code)
        const sendMail = await this.MAILService.send({
            recipient: email,
            subject: "کد ورود شما به دستیار هوش مصنوعی",
            body: `کد ورود: ${code}`,
        })

        res.send({
            success: true,
            message: "کد به ایمیلتان ارسال شد"
        })
    }

    public async verify(req: Request, res: Response, next: NextFunction) {
        let user = null
        const { verifyCode, email } = req.body
        const authenticate = this.OTPService.verifyOtp(email, verifyCode)
        if (!authenticate) {
            res.status(403).send({
                success: false,
                message: "please enter a valid code!"
            })
        }

        const findUser = await this.AuthService.findUser(email)
        if (!findUser) {
            user = await this.AuthService.createUser(email)
        } else {
            user = findUser
        }

        if (!user) {
            throw new Error('Oops! something was wrong.')
        }

        const accessToken = await this.TokenService.generateAccessToken({ id: user.id })
        const refreshToken = await this.TokenService.generateRefreshToken({ id: user.id })

        res.cookie('refresh-token', refreshToken, {
            httpOnly: true,
            secure: false,
            maxAge: 7 * 24 * 60 * 60 * 1000,
            sameSite: 'lax'
        })

        res.status(200).send({
            success: true,
            message: "user successfully login in app.",
            token: accessToken
        })
    }

    public async refreshToken(req: Request, res: Response, next: NextFunction) {
        const token = req.cookies['refresh-token']
        console.log('cookie',token);
        
        if (!token) return res.status(401).send("No refresh token");

        try {

            const { accessToken, refreshToken } = await this.TokenService.reassignToken(token)
            console.log('new refresh token', refreshToken);
            
            if (!refreshToken) return res.status(401).send({
                success: false,
                message: "Unauthorized!"
            });

            res.cookie('refresh-token', refreshToken, {
                httpOnly: true,
                secure: false,
                maxAge: 7 * 24 * 60 * 60 * 1000,
                sameSite: 'lax'
            })

            res.status(200).send({
                success: true,
                token: accessToken,
                message: "new Access Token Generated."
            })

        } catch (error) {
            res.status(401).send("Invalid refresh token");
            next(error)
        }

    }
}