import { Application, Router } from "express"
import RouteEngine from "./router"
import HomeRouter from '../components/home/router'


class RouteService {
    public app: Application
    private router: RouteEngine

    constructor(app: Application) {
        this.app = app
        this.router = new RouteEngine()
        this.bindRouter()
    }

    public bindRouter() {
        this.router.registerRouter("/home", HomeRouter)
    }
    public run() {
        this.router.getRouters().forEach((router: Router, route: string) => {
            this.app.use(route, router)
        })
    }


}

export default RouteService