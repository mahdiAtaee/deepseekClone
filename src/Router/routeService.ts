import { Application, Router } from "express"
import RouteEngine from "./router"
import UserRouter from '../components/User/router'
import MessageRouter from '../components/Message/router'
import AuthRegisterRouter from "../components/Auth/register/router"
import ChatRouter from '../components/Chat/router'
class RouteService {
    public app: Application
    private router: RouteEngine

    constructor(app: Application) {
        this.app = app
        this.router = new RouteEngine()
        this.bindRouter()
    }

    public bindRouter() {
        this.router.registerRouter("/api/v1/auth/register", AuthRegisterRouter)
        this.router.registerRouter("/api/v1/users", UserRouter)
        this.router.registerRouter("/api/v1/messages", MessageRouter)
        this.router.registerRouter("/api/v1/chat", ChatRouter)
    }
    public run() {
        this.router.getRouters().forEach((router: Router, route: string) => {
            this.app.use(route, router)
        })
    }


}

export default RouteService