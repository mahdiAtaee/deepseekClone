import { RequestHandler, Router } from "express";
import { makeInvoker } from "awilix-express";
import { UserController } from "./Controller";
import { Auth } from "../../middlewares/Auth";
const router: Router = Router()

const api = makeInvoker(UserController)

router.get('/', Auth as unknown as RequestHandler, api('index'))

export default router


