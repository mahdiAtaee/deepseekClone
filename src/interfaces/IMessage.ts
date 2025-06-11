import { IChat } from "./IChat";

export interface IMessage {
    id: string
    chat: IChat
    chatId: string
    role: string
    content: string,
    created_at: Date,
}