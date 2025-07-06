import { Chat } from "../../../generated/prisma";
import IRepository from "../../../constant/IRepository";


export default interface IChatRepository extends IRepository<Chat> {
    findByDate(Date: string | Date): Promise<Chat[]>
}