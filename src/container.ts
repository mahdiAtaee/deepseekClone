import { PrismaClient } from '@prisma/client'
import { createContainer, asClass, asValue } from 'awilix'
import { UserRepository } from './components/User/repositories/UserRepository'
import { UserService } from './components/User/repositories/UserService'
import { UserController } from './components/User/Controller'


// ابتدا PrismaClient را بساز
const prisma = new PrismaClient()
const container = createContainer({
    injectionMode: 'PROXY'
})

container.register({
    prisma: asValue(prisma),
    userService: asClass(UserService).scoped(),
    userRepository: asClass(UserRepository).scoped(),
    userController: asClass(UserController).scoped()
})

export default container