import { Router } from "express";
import { makeInvoker } from "awilix-express";
import { UserController } from "./Controller";
import container from "../../container";
const router: Router = Router()

const api = makeInvoker(UserController)

router.get('/', container.resolve('userController').index.bind(container.resolve('userController')))

export default router


