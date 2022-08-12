import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateUserUseCase } from "./CreateUserUseCase";


class CreateUserController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { name, password, driver_license, email } = request.body;
        const createUserUseCase = container.resolve(CreateUserUseCase);
        await createUserUseCase.execute({
            name,
            password,
            driver_license,
            email
        });
        return response.status(201).send();
    };
};

export { CreateUserController };