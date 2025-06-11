import IUserRepository from "./IUserRepository"

export class UserService {
    private readonly UserRepository: IUserRepository
    constructor({ userRepository }: { userRepository: IUserRepository }) {
        this.UserRepository = userRepository
    }

    public getUser(id: number) {
        return this.UserRepository.findOne(id)
    }

    getAllUsers = () => {
        return this.UserRepository.findMany({})
    }

}