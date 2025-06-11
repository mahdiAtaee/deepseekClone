import IUserRepository from "./IUserRepository";
import { PrismaClient } from '@prisma/client';


export class UserRepository implements IUserRepository {
    private prisma: PrismaClient

    constructor({ prisma }: { prisma: PrismaClient }) {
        this.prisma = prisma
    }
    async findOne(ID: number): Promise<any> {
        const result = await this.prisma.User.findUnique({ where: { id:ID } });
        return result
    }
    async findMany(params: any): Promise<any[]> {
        const result = await this.prisma.User.findMany(params)
        return result
    }
    create(params: any): Promise<any> {
        throw new Error("Method not implemented.");
    }
    updateOne(where: Partial<any>, params: Partial<any>): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    updateMany(where: Partial<any>, params: Partial<any>): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    deleteOne(ID: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    deleteMany(where: any): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

}
