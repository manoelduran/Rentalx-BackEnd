import { Router, Request, Response } from 'express';
import { CreateCategoryController } from '../modules/cars/useCases/createCategory/CreateCategoryController';
import { listCategoriesController } from '../modules/cars/useCases/listCategories';
import { importCategoryController } from '../modules/cars/useCases/importCategory';
import multer from 'multer';



const categoriesRoutes = Router();

const upload = multer({
    dest: "./tmp",
});

const createCategoryCOntroller = new CreateCategoryController();

categoriesRoutes.post("/", createCategoryCOntroller.handle);

categoriesRoutes.get("/", (request: Request, response: Response) => {
    return listCategoriesController.handle(request, response);
});

categoriesRoutes.post("/import", upload.single("file"), (request, response) => {
    return importCategoryController.handle(request, response);
})

export { categoriesRoutes };