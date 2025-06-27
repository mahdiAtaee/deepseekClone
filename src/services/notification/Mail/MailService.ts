import IMailer from "./contracts/IMailer";
import IMessage from "./contracts/IMessage";

export class MailService implements IMailer {
    private readonly defaultProvider: IMailer
    constructor({ mailTrap }: { mailTrap: IMailer }) {
        this.defaultProvider = mailTrap
    }
    async send(message: IMessage): Promise<void> {
        this.defaultProvider.send(message)
    }
}