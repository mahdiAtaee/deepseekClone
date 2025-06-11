import IRepository from "../../../constant/IRepository";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
type UserType = NonNullable<Awaited<ReturnType<typeof prisma.user.findFirst>>>;

export default interface IUserRepository extends IRepository<UserType> {
    
}