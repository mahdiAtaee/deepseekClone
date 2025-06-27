import { NextFunction, Request, Response } from "express";
import { OtpService } from "../../../services/OtpService";
import IMailer from "../../../services/notification/Mail/contracts/IMailer";


export class RegisterController {
    private readonly OTPService: OtpService
    private readonly MAILService: IMailer
    constructor({ otpService, mailService }: { otpService: OtpService, mailService: IMailer }) {
        this.OTPService = otpService
        this.MAILService = mailService
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
        const { verifyCode, email } = req.body
        const authenticate = this.OTPService.verifyOtp(email, verifyCode)
        if (!authenticate) {
            res.status(403).send({
                success: false,
                message: "please enter a valid code!"
            })
        }
        res.status(200).send({
            success: true,
            message: "user successfully login in app.",
            token: null
        })
    }
}