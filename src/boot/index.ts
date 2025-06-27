import * as bodyParser from 'body-parser'
const cookieParser = require('cookie-parser')
import * as cors from 'cors'
import { Application } from "express";
import * as express from 'express';
import { scopePerRequest, loadControllers } from 'awilix-express';
import initContainer from '../container';

export default async function boot(app: Application) {
    const container = await initContainer()
    app.use(cors(
        {
            origin: true,
            credentials: true

        }))
    app.use(cookieParser())
    app.use(bodyParser.json())
    app.use(express.json());
    app.use(scopePerRequest(container));
    app.use(loadControllers('controllers/*.controller.ts', {
        cwd: __dirname,
    }));
}