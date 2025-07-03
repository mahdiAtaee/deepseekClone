import { IChat } from "./IChat"

export interface IUser {
    id: string
    email: string
    name?: string
    created_at: Date
    chats: IChat[]
}