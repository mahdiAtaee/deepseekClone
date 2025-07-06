import { IChat } from "src/interfaces/IChat";
import IChatRepository from "./IChatRepository";
import { Chat, PrismaClient } from "../../../generated/prisma";


export class ChatRepository implements IChatRepository {
    private readonly Prisma: PrismaClient
    constructor({ prisma }: { prisma: PrismaClient }) {
        this.Prisma = prisma
    }
    public async findOne(ID: number): Promise<Chat> {
        throw new Error("Method not implemented.");
    }
    public async findByDate(Date: string | Date): Promise<Chat[]> {
        const chats = await this.Prisma.chat.findMany({
            where: {
                createdAt: {
                    gte: Date
                }
            }
        })
        return chats
    }
    public async findMany(params: any): Promise<Chat[]> {
        const chats = await this.Prisma.chat.findMany({
            where: {
                ...params
            }
        })
        return chats
    }
    public async create(params: any): Promise<Chat> {
        const chat = await this.Prisma.chat.create({
            data: {
                title: params.title,
                userId: String(params.userId),
                ...params
            }
        })
        return chat
    }
    updateOne(where: Partial<Chat>, params: Partial<Chat>): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    updateMany(where: Partial<Chat>, params: Partial<Chat>): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    deleteOne(ID: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    deleteMany(where: any): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

}