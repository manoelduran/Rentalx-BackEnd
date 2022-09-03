import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";
import { AppError } from "@shared/errors/AppError";
import { NextFunction, Request, Response } from "express";


const ensureIsAdmin = async (request: Request, response: Response, next: NextFunction) => {
    const { id } = request.user;
    const usersRepository = new UsersRepository();
    const selectedUser = await usersRepository.findById(id);
    if (!selectedUser.isAdmin) {
        throw new AppError("Only Admin users can access this route!");
    };
    return next();
};


export { ensureIsAdmin };