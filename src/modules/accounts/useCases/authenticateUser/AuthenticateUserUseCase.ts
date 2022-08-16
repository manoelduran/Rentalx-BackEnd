import { inject, injectable } from "tsyringe";
import { compare } from 'bcrypt';
import { IUsersRepository } from "../../repositories/implementations/IUsersRepository";
import { sign } from "jsonwebtoken";
import { AppError } from "../../../../errors/AppError";

interface IRequest {
    email: string;
    password: string;
};

interface IResponse {
    userAlreadExists: {
        name: string;
        email: string;
    };
    token: string;
};

@injectable()
class AuthenticateUserUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ) { }
    async execute({ email, password }: IRequest): Promise<IResponse> {
        // Verificação da existencia do usuário no banco
        const userAlreadExists = await this.usersRepository.findByEmail(email);
        if (!userAlreadExists) {
            throw new AppError("Email or password are incorrect! Try another one!");
        };
        // Comparação com a senha digitada com a senha resgatada do usuário do banco
        const comparedPassword = await compare(password, userAlreadExists.password);
        if (!comparedPassword) {
            throw new AppError("As senhas precisam ser iguais!")
        }
        // token de authenticação JWT
        const token = sign({}, "23a8f58ecbc0d219ba89218a2c320667", {
            subject: userAlreadExists.id,
            expiresIn: "1d"
        });

        const tokenReturn: IResponse = {
            token,
            userAlreadExists: {
                name: userAlreadExists.name,
                email: userAlreadExists.email,
            }
        }
        return tokenReturn;
    };
};

export { AuthenticateUserUseCase };