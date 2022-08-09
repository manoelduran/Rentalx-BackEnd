import { Request, Response } from "express";
import { ListCategoriesUseCase } from "./ListCategoriesUseCase";
import { container } from 'tsyringe';

class ListCategoriesController {
    async handle(request: Request, response: Response): Promise<Response> {
        const listCategoriesUseCase = container.resolve(ListCategoriesUseCase)
        const list = await listCategoriesUseCase.execute();
        return response.status(200).json(list);
    }
};

export { ListCategoriesController };