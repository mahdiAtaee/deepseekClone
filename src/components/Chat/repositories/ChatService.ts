import IChatRepository from "./IChatRepository";


export class ChatService {
    private readonly ChatRepository: IChatRepository
    constructor({ chatRepository }: { chatRepository: IChatRepository }) {
        this.ChatRepository = chatRepository
    }

    public async getAllSession(userId: string) {
        const sessions = await this.ChatRepository.findMany({ userId })
        return sessions
    }

    public async newSession(userId: string, title?: string) {
        const result = await this.ChatRepository.create({ userId, title })
        return result
    }

    public async find(date: Date) {
        const result = await this.ChatRepository.findByDate(date)
        return result
    }
}