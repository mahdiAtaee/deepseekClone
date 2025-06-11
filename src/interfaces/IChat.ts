import { IMessage } from "./IMessage"
import { IUser } from "./IUser"

export interface IChat {
    id: string
    user: IUser
    userId: string
    title: string
    createdAt: Date
    updatedAt: Date
    messages: IMessage[]
}