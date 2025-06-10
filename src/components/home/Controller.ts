import { NextFunction, Request, Response } from 'express'
import { prisma } from '../../lib/prisma'

class Controller {
    constructor() { }

    public async index(req: Request, res: Response, next: NextFunction): Promise<void> {
        const users = await prisma.user.findMany()
        res.send({
            success: true,
            users
        })
    }

}

export default Controller