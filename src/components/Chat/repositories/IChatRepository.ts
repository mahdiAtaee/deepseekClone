import { Chat } from "../../../generated/prisma";
import IRepository from "../../../constant/IRepository";
import { IChat } from "../../../interfaces/IChat";


export default interface IChatRepository extends IRepository<Chat>{}