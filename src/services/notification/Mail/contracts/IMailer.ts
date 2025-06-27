import IMessage from "./IMessage";

export default interface IMailer {
    send(message: IMessage): Promise<void>
}