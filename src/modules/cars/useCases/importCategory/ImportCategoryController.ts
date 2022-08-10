import { Request, Response } from 'express';
import { ImportCategoryUseCase } from './ImportCategoryUseCase';
import { container } from 'tsyringe';


class ImportCategoryController {
   async handle(request: Request, response: Response): Promise<Response> {
        const importCategoryUseCase = container.resolve(ImportCategoryUseCase);
        const { file } = request;
        console.log('file', file)
        await importCategoryUseCase.execute(file);
        return response.status(201).send();
    }
}

export { ImportCategoryController };