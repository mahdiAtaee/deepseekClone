import IMessageRepository from "./IMessageRepository";



export class MessageService {
    private readonly MessageRepository: IMessageRepository
    constructor({ messageRepository }: { messageRepository: IMessageRepository }) {
        this.MessageRepository = messageRepository
    }

    public async getAllMessage(chatId: string) {
        const messages = await this.MessageRepository.findMany({ chatId })
        return messages
    }

    public async store(content: string, chatId: string) {
        const storeMessage = await this.MessageRepository.create({ content, chatId })
        return storeMessage
    }
}