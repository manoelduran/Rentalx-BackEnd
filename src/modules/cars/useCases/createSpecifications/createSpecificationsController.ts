import { Request, Response } from "express";
import { CreateSpecificationsUseCase } from "./createSpecificationsUseCase";
import { container } from 'tsyringe';
class CreateSpecificationsController {

    async handle(request: Request, response: Response): Promise<Response> {
        const createSpecificationsUseCase = container.resolve(CreateSpecificationsUseCase);
        const { name, description } = request.body;
        await createSpecificationsUseCase.execute({ name, description });
        return response.status(201).send();
    }
}

export { CreateSpecificationsController };