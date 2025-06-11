import { NextFunction, Request, Response } from 'express'
import { UserService } from './repositories/UserService'

export class UserController {
    private readonly UserServices: UserService
    constructor({ userService }: { userService: UserService }) { 
        this.UserServices = userService
    }

    public async index(req: Request, res: Response, next: NextFunction): Promise<void> {
        console.log('userService is:', this.UserServices)


        const users = await this.UserServices.getUser(1)
        res.send({
            success: true,
            users
        })
    }

}
