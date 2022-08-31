
import { inject, injectable } from 'tsyringe';
import { hash } from 'bcrypt';
import { IUsersRepository } from '@modules/accounts/repositories/implementations/IUsersRepository';
import { ICreateUserDTO } from '@modules/accounts/dtos/ICreateUserDTO';
import { AppError } from '@shared/errors/AppError';



@injectable()
class CreateUserUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ) { }
    async execute({ name, email, password, driver_license }: ICreateUserDTO): Promise<void> {
        const userAlreadyExists = await this.usersRepository.findByEmail(email);
        if (userAlreadyExists) {
            throw new AppError("User already exists");
        };
        const hasPassword = await hash(password, 8);
        await this.usersRepository.create({
            name,
            email,
            driver_license,
            password: hasPassword,
        });
    }
}

export { CreateUserUseCase };