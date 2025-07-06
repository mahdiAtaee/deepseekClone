import { RequestHandler, Router } from "express";
import { ChatController } from "./Controller";
import { makeInvoker } from "awilix-express";
import { Auth } from "../../middlewares/Auth";
const router: Router = Router()

const api = makeInvoker(ChatController)

router.post('/', Auth as unknown as RequestHandler, api('addSession'))
router.get('/', Auth as unknown as RequestHandler, api('getChatList'))
router.get('/search/:chatId', Auth as unknown as RequestHandler, api('searchChat'))
router.post('/search', Auth as unknown as RequestHandler, api('searchChat'))

export default router