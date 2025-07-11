import { NextFunction, Request, Response } from "express";
import axios from "axios";
import { MessageService } from "./repositories/MessageService";
import detectLanguage from '../../services/langDetector'
import * as multer from 'multer'
import * as pdfParse from 'pdf-parse'
import * as mammoth from 'mammoth'
import * as fs from 'fs'

export class MessageController {
    private readonly MessageServiceInstance: MessageService
    constructor({ messageService }: { messageService: MessageService }) {
        this.MessageServiceInstance = messageService
    }

    public async index(req: Request, res: Response, next: NextFunction) {
        const userPrompt = req.body.prompt
        const chatId = req.body.chatId
        const thinkForLonger = req.body.thinkForLonger
        const searchTheWeb = req.body.searchTheWeb
        const file = req.file

        console.log(file);

        let text = ''
        if (file) {
            if (file.mimetype === 'application/pdf') {
                const data = await pdfParse(fs.readFileSync(file.path))
                text = data.text
            } else if (file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
                const result = await mammoth.extractRawText({ path: file.path })
                text = result.value
            } else if (file.mimetype.startsWith('text/')) {
                text = fs.readFileSync(file.path, 'utf-8')
            }
        }


        const lang = detectLanguage(userPrompt)

        const systemPrompt = lang === "fa"
            ? `شما یک دستیار فارسی‌زبان، مفید و هوشمند هستید.
                همیشه پاسخ‌ها را فقط به زبان فارسی بنویس
                پاسخ‌های خود را فقط با استفاده از فرمت Markdown (مانند تیترها، لیست‌های بولت‌دار، جدول‌ها) برای خوانایی بهتر تنظیم کن.
                فقط از فرمت‌دهی استفاده کن — **اما لحن، موضوع یا جزئیات پاسخ را به‌هیچ‌وجه تغییر نده.**
                `
            : `You are a helpful assistant.
               Always respond in English
                        Format your responses using Markdown (e.g., headings, bullet points, tables) for better readability.
                        Only use formatting — **do not change the tone, topic, or detail of the answer** because of it.`

        let messages = [
            {
                role: "system",
                content: systemPrompt
            },
            {
                role: "user",
                content: userPrompt
            }
        ]

        if (file && text) {
            messages = [
                {
                    role: "system",
                    content: systemPrompt
                },
                {
                    role: "user",
                    content: lang === 'fa'
                        ? `این یک مقاله و متن است:\n\n${text}\n\nلطفا با توجه به این متن به سوال پاسخ بده:\n${userPrompt}`
                        : `Here is a document:\n\n${text}\n\nPlease answer the following question:\n${userPrompt}`
                }
            ]
        }

        if (thinkForLonger) {
            messages[messages.length - 1].content += lang === 'fa'
                ? '\n\nو جواب فارسی بده لطفاً عمیق‌تر فکر کن، تحلیلی‌تر باش و با جزئیات بیشتری توضیح بده.'
                : '\n\nPlease think deeply, be more analytical, and explain in more detail.'
        }

        const response = await axios.post('https://openrouter.ai/api/v1/chat/completions', {
            model: "mistralai/mistral-7b-instruct",
            messages,
            temperature: thinkForLonger ? 0.3 : 0.7,
            max_tokens: thinkForLonger ? 2048 : 512,
        }, {
            headers: {
                Authorization: `Bearer ${process.env.DEEPSEEK_API_TOKEN as unknown as string}`,
                "HTTP-Referer": "http://localhost:5000",
                'Content-Type': 'application/json'
            }
        })

        const reply = response.data.choices[0].message.content
        console.log("🤖 پاسخ مدل:\n", reply)

        const content = {
            userMessage: userPrompt,
            aiMessage: reply
        }

        const saveMessage = await this.MessageServiceInstance.store(JSON.stringify(content), chatId)


        res.send({
            success: true,
            reply
        })
    }

    public async messageList(req: Request, res: Response, next: NextFunction) {
        try {
            const { chatId } = req.params
            if (!chatId) {
                res.status(400).send({
                    success: false,
                    message: "chat ID is required!"
                })
            }
            const messages = await this.MessageServiceInstance.getAllMessage(chatId)

            res.status(200).send({
                success: true,
                messages
            })

        } catch (error) {
            console.log(error)
            res.status(500).send({
                success: false,
                message: "something was wrong."
            })
        }
    }
}