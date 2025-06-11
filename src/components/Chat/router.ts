import { Router } from "express";
import { ChatController } from "./Controller";
import { makeInvoker } from "awilix-express";
const router: Router = Router()

const api = makeInvoker(ChatController)


export default router