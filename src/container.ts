import { PrismaClient } from "./generated/prisma"
import { createContainer, asClass, asValue } from 'awilix'
// User
import { UserRepository } from './components/User/repositories/UserRepository'
import { UserService } from './components/User/repositories/UserService'
import { UserController } from './components/User/Controller'

//Message
import { MessageController } from "./components/Message/Controller"
import { MessageRepository } from "./components/Message/repositories/MessageRepository"
import { MessageService } from "./components/Message/repositories/MessageService"

// Chat


// ابتدا PrismaClient را بساز
const prisma = new PrismaClient()
const container = createContainer({
    injectionMode: 'PROXY'
})

container.register({
    prisma: asValue(prisma),
    // User
    userService: asClass(UserService).scoped(),
    userRepository: asClass(UserRepository).scoped(),
    userController: asClass(UserController).scoped(),
    // Message
    messageService: asClass(MessageService).scoped(),
    messageRepository: asClass(MessageRepository).scoped(),
    messageController: asClass(MessageController).scoped(),
    // Chat
})

export default container