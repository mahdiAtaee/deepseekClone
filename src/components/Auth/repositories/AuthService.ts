import IAuthRepository from "./IAuthRepository"

export class AuthService {
    private readonly AuthRepository: IAuthRepository
    constructor({ authRepository }: { authRepository: IAuthRepository }) {
        this.AuthRepository = authRepository
    }

    public async createUser(email: string) {
        return await this.AuthRepository.create({ email, name: "" })
    }

    public async findUser(email: string) {
        return await this.AuthRepository.findByEmail(email)
    }

}