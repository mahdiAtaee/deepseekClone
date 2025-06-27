import { PrismaClient } from "./generated/prisma"
import { createContainer, asClass, asValue } from 'awilix'

// redis
import createRedisClient from "./connections/redis"

// Otp Service
import { OtpService } from "./services/OtpService"

// MailService
import { MailTrap } from "./services/notification/Mail/Provider/Mailtrap"
import { MailService } from "./services/notification/Mail/MailService"

// User
import { UserRepository } from './components/User/repositories/UserRepository'
import { UserService } from './components/User/repositories/UserService'
import { UserController } from './components/User/Controller'

//Message
import { MessageController } from "./components/Message/Controller"
import { MessageRepository } from "./components/Message/repositories/MessageRepository"
import { MessageService } from "./components/Message/repositories/MessageService"

// Chat


// Register
import { RegisterController } from "./components/Auth/register/Controller"


export default async function initContainer() {


    // ابتدا PrismaClient را بساز
    const prisma = new PrismaClient()
    const redisClient = await createRedisClient()
    const container = createContainer({
        injectionMode: 'PROXY'
    })




    container.register({
        prisma: asValue(prisma),

        // Redis
        redis: asValue(redisClient),

        // User
        userService: asClass(UserService).scoped(),
        userRepository: asClass(UserRepository).scoped(),
        userController: asClass(UserController).scoped(),
        // Message
        messageService: asClass(MessageService).scoped(),
        messageRepository: asClass(MessageRepository).scoped(),
        messageController: asClass(MessageController).scoped(),
        // Chat

        // Register
        registerController: asClass(RegisterController).scoped(),

        // MailService
        mailTrap: asClass(MailTrap).scoped(),
        mailService: asClass(MailService).scoped(),

        // OTP SERVICE
        otpService: asClass(OtpService).scoped()
    })



    return container
}
