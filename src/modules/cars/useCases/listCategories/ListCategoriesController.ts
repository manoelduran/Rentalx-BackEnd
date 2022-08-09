import { Request, Response } from "express";
import { ListCategoriesUseCase } from "./ListCategoriesUseCase";
import { container } from 'tsyringe';

class ListCategoriesController {
    handle(request: Request, response: Response): Response {
        const listCategoriesUseCase = container.resolve(ListCategoriesUseCase)
        listCategoriesUseCase.execute();
        return response.status(200).json();
    }
};

export { ListCategoriesController };