import { RequestHandler, Router } from "express";
import { MessageController } from "./Controller";
import { makeInvoker } from "awilix-express";
import { Auth } from "../../middlewares/Auth";
const router: Router = Router()

const api = makeInvoker(MessageController)

router.post('/', Auth as unknown as RequestHandler, api('index'))

export default router