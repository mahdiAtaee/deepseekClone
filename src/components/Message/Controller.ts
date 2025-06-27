import { NextFunction, Request, Response } from "express";
import axios from "axios";
import { MessageService } from "./repositories/MessageService";
import detectLanguage from '../../services/langDetector'

export class MessageController {
    private readonly MessageServiceInstance: MessageService
    constructor({ messageService }: { messageService: MessageService }) {
        this.MessageServiceInstance = messageService
    }

    public async index(req: Request, res: Response, next: NextFunction) {
        const userPrompt = req.body.prompt
        const lang = detectLanguage(userPrompt)

        const systemPrompt = lang === "fa"
            ? `شما یک دستیار مفید و هوشمند هستید.
                پاسخ‌های خود را فقط با استفاده از فرمت Markdown (مانند تیترها، لیست‌های بولت‌دار، جدول‌ها) برای خوانایی بهتر تنظیم کن.
                فقط از فرمت‌دهی استفاده کن — **اما لحن، موضوع یا جزئیات پاسخ را به‌هیچ‌وجه تغییر نده.**
                `
            : `You are a helpful assistant.
                        Format your responses using Markdown (e.g., headings, bullet points, tables) for better readability.
                        Only use formatting — **do not change the tone, topic, or detail of the answer** because of it.`

        const messages = [
            {
                role: "system",
                content: systemPrompt
            },
            {
                role: "user",
                content: userPrompt
            }
        ]

        const response = await axios.post('https://openrouter.ai/api/v1/chat/completions', {
            model: "mistralai/mistral-7b-instruct",
            messages
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