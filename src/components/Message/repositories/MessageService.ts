import IMessageRepository from "./IMessageRepository";



export class MessageService {
    private readonly MessageRepository: IMessageRepository
    constructor({ messageRepository }: { messageRepository: IMessageRepository }) {
        this.MessageRepository = messageRepository
    }

    getAllMessage() { }
}