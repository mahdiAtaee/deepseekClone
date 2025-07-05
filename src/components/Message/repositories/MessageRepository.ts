import { IMessage } from "src/interfaces/IMessage";
import IMessageRepository from "./IMessageRepository";
import { PrismaClient } from "@prisma/client";
import { Message } from "../../../generated/prisma";



export class MessageRepository implements IMessageRepository {
    private readonly prisma: PrismaClient
    constructor({ prisma }: { prisma: PrismaClient }) {
        this.prisma = prisma
    }
    public async findOne(ID: number): Promise<Message> {
        throw new Error("Method not implemented.");
    }
    public async findMany(params: any): Promise<Message[]> {
        const result = await this.prisma.message.findMany({
            where: {
                ...params
            },
            orderBy: [
                { createdAt: "asc" }
            ]
        })
        return result
    }
    public async create(params: any): Promise<Message> {
        const result = await this.prisma.message.create({
            data: { ...params }
        })
        return result
    }
    public async updateOne(where: Partial<Message>, params: Partial<Message>): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    public async updateMany(where: Partial<Message>, params: Partial<Message>): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    public async deleteOne(ID: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    public async deleteMany(where: any): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

}