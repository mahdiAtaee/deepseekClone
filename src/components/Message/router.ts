import { Router } from "express";
import { MessageController } from "./Controller";
import { makeInvoker } from "awilix-express";
const router:Router = Router()

const api = makeInvoker(MessageController)

router.post('/', api('index'))

export default router