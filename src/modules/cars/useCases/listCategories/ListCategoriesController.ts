import { Request, Response } from "express";
import { ListCategoriesUseCase } from "./ListCategoriesUseCase";

class ListCategoriesController {
    constructor(private listCategoriesUseCase: ListCategoriesUseCase) { }
    handle(request: Request, response: Response): Response {
   const list = this.listCategoriesUseCase.execute();
        return response.status(200).json(list);
    }
};

export { ListCategoriesController };