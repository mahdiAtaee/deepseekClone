import { NextFunction, Response, Request } from "express";
import { ChatService } from "./repositories/ChatService";
import { AwilixContainer } from "awilix";

interface ScopedRequest extends Request {
    container: AwilixContainer;
    user?: any;
}

export class ChatController {
    private readonly chatService: ChatService
    constructor({ chatService }: { chatService: ChatService }) {
        this.chatService = chatService
    }

    public async getChatList(req: ScopedRequest, res: Response, next: NextFunction) {
        try {
            const user = req.user

            const chats = await this.chatService.getAllSession(user.id)
            if (!chats) {
                res.send({
                    success: false,
                    message: "something was wrong!"
                })
            }

            res.send({
                success: true,
                conversations: chats
            })
        } catch (error) {
            res.status(500).send({
                success: false,
                message: "something was wrong!"
            })
        }
    }

    public async addSession(req: ScopedRequest, res: Response, next: NextFunction) {
        try {
            const { title } = req.body
            const user = req.user

            const userId: string = user.id as unknown as string
            const result = await this.chatService.newSession(userId, title)
            if (!result) {
                res.send({
                    success: false,
                    message: "something was wrong!"
                })
            }

            res.send({
                success: true,
                message: "new chat created successfully.",
                conversation: result.id
            })
        } catch (error) {
            console.log(error)
            res.status(500).send({
                success: false,
                message: "something was wrong!"
            })
        }

    }

    public async searchChat(req: ScopedRequest, res: Response, next: NextFunction) {
        try {
            const { date } = req.body

            if (!date) {
                return res.status(400).send({
                    success: false,
                    message: "chat ID is required."
                })
            }

            const newDate = new Date(date)

            const chat = await this.chatService.find(newDate)
            if (!chat) {
                return res.status(404).send({
                    success: false,
                    message: "Oops. chat Notfound."
                })
            }
            res.status(200).send({
                success: true,
                chat
            })

        } catch (error) {
            console.log(error)
            res.status(500).send({
                success: false,
                message: "something was wrong"
            })
        }
    }
}