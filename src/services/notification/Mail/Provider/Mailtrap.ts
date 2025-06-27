import IMailer from "../contracts/IMailer";
import IMessage from "../contracts/IMessage";
import { createTransport } from 'nodemailer'

export class MailTrap implements IMailer {
    private smtpTransport: any
    constructor() {
        this.smtpTransport = createTransport({
            host: process.env.MAILTRAP_HOST as unknown as string,
            port: process.env.MAILTRAP_PORT as unknown as number,
            secure: false, // true for 465, false for other ports
            auth: {
                user: process.env.MAILTRAP_USERNAME as unknown as string,
                pass: process.env.MAILTRAP_PASSWORD as unknown as string,
            },
        });
    }
    async send(message: IMessage): Promise<void> {
        this.smtpTransport.sendMail({
            from: '"AI Assistant <mahdiataee1689@gmail.com>',
            to: message.recipient,
            subject: message.subject,
            text: message.body,
        })
    }

}