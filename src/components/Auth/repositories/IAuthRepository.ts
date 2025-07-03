import { IUser } from "../../../interfaces/IUser";
import IRepository from "../../../constant/IRepository";
import { PrismaClient, User } from "../../../generated/prisma";


export default interface IAuthRepository extends IRepository<User> {
    findByEmail(email: string): Promise<User | null>
}