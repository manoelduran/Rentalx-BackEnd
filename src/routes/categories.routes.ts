import { Router, Request, Response } from 'express';
import { createCategoryController } from '../modules/cars/useCases/createCategory';
import { listCategoriesController } from '../modules/cars/useCases/listCategories';


const categoriesRoutes = Router();


categoriesRoutes.post("/", (request, response) => {
    return createCategoryController.handle(request, response);
});

categoriesRoutes.get("/", (request: Request, response: Response) => {
    return listCategoriesController.handle(request, response);
});

export { categoriesRoutes };