import { inject, injectable } from "tsyringe";
import { compare } from 'bcrypt';

import { sign } from "jsonwebtoken";
import { AppError } from "@shared/errors/AppError";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import auth from "@config/auth";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";

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
    refresh_token: string;
};

@injectable()
class AuthenticateUserUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository,
        @inject("UsersTokensRepository")
        private usersTokensRepository: IUsersTokensRepository,
        @inject("DayjsDateProvider")
        private dayjsDateProvider: IDateProvider
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
        const token = sign({}, auth.secret_token, {
            subject: userAlreadExists.id,
            expiresIn: auth.expires_in_token
        });
        const refresh_token = sign({ email }, auth.secret_refresh_token, {
            subject: userAlreadExists.id,
            expiresIn: auth.expires_in_refresh_token
        })
        const refresh_token_expires_date = this.dayjsDateProvider.addDays(auth.expires_refresh_token_days)
        await this.usersTokensRepository.create({
            expires_date: refresh_token_expires_date,
            refresh_token,
            user_id: userAlreadExists.id
        })

        const tokenReturn: IResponse = {
            token,
            refresh_token,
            userAlreadExists: {
                name: userAlreadExists.name,
                email: userAlreadExists.email,
            }
        }
        return tokenReturn;
    };
};

export { AuthenticateUserUseCase };