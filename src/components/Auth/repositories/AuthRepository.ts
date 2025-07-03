import { IUser } from "src/interfaces/IUser";
import IAuthRepository from "./IAuthRepository";
import { PrismaClient, User } from "../../../generated/prisma";
import { Prisma } from "../../../generated/prisma";

type createUserInput = Omit<Prisma.UserCreateInput, 'id'>

export class AuthRepository implements IAuthRepository {
    private readonly prisma: PrismaClient
    constructor({ prisma }: { prisma: PrismaClient }) {
        this.prisma = prisma
    }
    public async findByEmail(email: string): Promise<User | null> {
        const user = await this.prisma.user.findUnique({
            where: {
                email
            }
        })
        if(!user){
            return null
        }
        return user
    }
    public async findOne(ID: number): Promise<User> {
        throw new Error("Method not implemented.");
    }
    public async findMany(params: any): Promise<User[]> {
        throw new Error("Method not implemented.");
    }
    public async create(params: createUserInput): Promise<User> {
        const user = await this.prisma.user.create({
            data: { ...params }
        })
        return user
    }
    public async updateOne(where: Partial<User>, params: Partial<User>): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    public async updateMany(where: Partial<User>, params: Partial<User>): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    public async deleteOne(ID: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    public async deleteMany(where: any): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

}