import { Request, Response } from "express";
import { CreateSpecificationsUseCase } from "./createSpecificationsUseCase";
import { container } from 'tsyringe';
class CreateSpecificationsController {

    handle(request: Request, response: Response): Response {
        const createSpecificationsUseCase = container.resolve(CreateSpecificationsUseCase);
        const { name, description } = request.body;
        createSpecificationsUseCase.execute({ name, description });
        return response.status(201).send();
    }
}

export { CreateSpecificationsController };