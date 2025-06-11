import * as bodyParser from 'body-parser'
import * as cors from 'cors'
import { Application } from "express";
import * as express from 'express';
import { scopePerRequest, loadControllers } from 'awilix-express';
import container from '../container';

export default function boot(app: Application) {
    app.use(cors(
        {
            origin: true,
            credentials: true

        }))
    app.use(bodyParser.json())
    app.use(express.json());
    app.use(scopePerRequest(container));
    app.use(loadControllers('controllers/*.controller.ts', {
        cwd: __dirname,
    }));
}