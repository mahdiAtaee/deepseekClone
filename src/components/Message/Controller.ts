import { NextFunction, Request, Response } from "express";
import axios from "axios";
import { MessageService } from "./repositories/MessageService";

export class MessageController {
    private readonly MessageServiceInstance: MessageService
    constructor({ messageService }: { messageService: MessageService }) {
        this.MessageServiceInstance = messageService
    }

    public async index(req: Request, res: Response, next: NextFunction) {
        const response = await axios.post('https://openrouter.ai/api/v1/chat/completions', {
            model: "mistralai/mistral-7b-instruct",
            messages: [{ role: 'user', content: "hi" }]
        }, {
            headers: {
                Authorization: `Bearer ${process.env.DEEPSEEK_API_TOKEN as unknown as string}`,
                "HTTP-Referer": "http://localhost:5000",
                'Content-Type': 'application/json'
            }
        })

        const reply = response.data.choices[0].message.content
        console.log("🤖 پاسخ مدل:\n", reply)

        res.send({
            success: true,
            reply
        })
    }
}