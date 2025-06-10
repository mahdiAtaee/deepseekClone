import * as bodyParser from 'body-parser'
import * as cors from 'cors'
import { Application } from "express";


export default function boot(app: Application) {
    app.use(cors(
        {
            origin: true,
            credentials: true

        }))
    app.use(bodyParser.json())
}