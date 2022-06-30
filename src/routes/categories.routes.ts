import { Router, Request, Response } from 'express';
import { CategoriesRepository } from '../modules/cars/repositories/CategoriesRepository';
import { CreateCategoryService } from '../modules/cars/services/CreateCategoryService';

const categoriesRoutes = Router();
const categoriesRepository = new CategoriesRepository();

categoriesRoutes.post("/", (request: Request, response: Response) => {
    const { name, description } = request.body;
    const createCategoryService = new CreateCategoryService(categoriesRepository);
    createCategoryService.execute({ name, description });

    return response.status(201).send();
});

categoriesRoutes.get("/", (request: Request, response: Response) => {
    const list = categoriesRepository.list();
    return response.status(200).json(list);
});

export { categoriesRoutes };