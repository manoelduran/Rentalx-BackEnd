import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { AppError } from '../errors/AppError';
import { UsersRepository } from '../modules/accounts/repositories/UsersRepository';


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
        const { sub: user_id } = verify(token, "23a8f58ecbc0d219ba89218a2c320667") as IPayload;
        console.log(user_id);
        const usersRepository = new UsersRepository();
        const selectedUser = await usersRepository.findById(user_id);
        if (!selectedUser) {
            throw new AppError("User does not exists!", 401);
        };
        request.user = {
            id: user_id,
        };
        next();
    } catch (error) {
        throw new AppError("Invalid Token!", 401);
    }
}

export { ensureAuthenticated };