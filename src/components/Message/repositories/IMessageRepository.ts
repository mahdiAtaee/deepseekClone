import { Message } from "../../../generated/prisma";
import IRepository from "../../../constant/IRepository";
import { IMessage } from "../../../interfaces/IMessage";


export default interface IMessageRepository extends IRepository<Message>{

}