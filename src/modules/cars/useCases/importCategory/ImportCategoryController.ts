import { Request, Response } from 'express';
import { ImportCategoryUseCase } from './ImportCategoryUseCase';
import { container } from 'tsyringe';


class ImportCategoryController {
    handle(request: Request, response: Response): Response {
        const importCategoryUseCase = container.resolve(ImportCategoryUseCase);
        const { file } = request;
        importCategoryUseCase.execute(file);
        return response.send();
    }
}

export { ImportCategoryController };