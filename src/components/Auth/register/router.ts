import { Router } from "express";
const router: Router = Router()
import { RegisterController } from "./Controller";
import { makeInvoker } from "awilix-express";

const api = makeInvoker(RegisterController)

router.post('/', api('createUser'))
router.post('/verify', api('verify'))
router.get('/refresh', api('refreshToken'))

export default router