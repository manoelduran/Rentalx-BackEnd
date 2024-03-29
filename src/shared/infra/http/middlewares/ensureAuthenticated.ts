
import auth from '@config/auth';
import { UsersRepository } from '@modules/accounts/infra/typeorm/repositories/UsersRepository';
import { UsersTokensRepository } from '@modules/accounts/infra/typeorm/repositories/UsersTokensRepository';
import { AppError } from '@shared/errors/AppError';
import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';



interface IPayload {
    sub: string;
}

const ensureAuthenticated = async (request: Request, response: Response, next: NextFunction) => {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
        throw new AppError("You don't have a token!", 401)
    };
    const [, token] = authHeader.split(" ");
    try {
        const { sub: user_id } = verify(token, auth.secret_token) as IPayload;
        console.log(user_id);
        request.user = {
            id: user_id,
        };
        next();
    } catch (error) {
        throw new AppError("Invalid Token!", 401);
    }
}

export { ensureAuthenticated };