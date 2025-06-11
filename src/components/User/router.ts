import { Router } from "express";
import { makeInvoker } from "awilix-express";
import { UserController } from "./Controller";
const router: Router = Router()

const api = makeInvoker(UserController)

router.get('/', api('index'))

export default router


