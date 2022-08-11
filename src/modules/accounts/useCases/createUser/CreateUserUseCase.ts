
import { inject, injectable } from 'tsyringe';
import { IUsersRepository } from '../../repositories/implementations/IUsersRepository';


interface IRequest {
    name: string;
    username: string;
    email: string;
    password: string;
    driver_license: string;
}

@injectable()
class CreateUserUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ) { }
    async execute({ name, username, email, password, driver_license }: IRequest): Promise<void> {
        await this.usersRepository.create({
            name,
            username,
            email,
            password,
            driver_license
        });
    }
}

export { CreateUserUseCase };