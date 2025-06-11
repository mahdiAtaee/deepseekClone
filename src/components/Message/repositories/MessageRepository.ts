import { IMessage } from "src/interfaces/IMessage";
import IMessageRepository from "./IMessageRepository";
import { PrismaClient } from "@prisma/client";



export class MessageRepository implements IMessageRepository {
    private readonly prisma: PrismaClient
    constructor({ prisma }: { prisma: PrismaClient }) {
        this.prisma = prisma
    }
    findOne(ID: number): Promise<IMessage> {
        throw new Error("Method not implemented.");
    }
    findMany(params: any): Promise<IMessage[]> {
        throw new Error("Method not implemented.");
    }
    create(params: any): Promise<IMessage> {
        throw new Error("Method not implemented.");
    }
    updateOne(where: Partial<IMessage>, params: Partial<IMessage>): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    updateMany(where: Partial<IMessage>, params: Partial<IMessage>): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    deleteOne(ID: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    deleteMany(where: any): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

}