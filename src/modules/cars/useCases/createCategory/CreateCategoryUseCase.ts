
import { ICategoriesRepository } from "@modules/cars/repositories/ICategoriesRepository";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from 'tsyringe';



interface IRequest {
    name: string;
    description: string;
}

@injectable()
class CreateCategoryUseCase {

    constructor(
        @inject("CategoriesRepository")
        private categoriesRepository: ICategoriesRepository
    ) { }
    async execute({ name, description }: IRequest): Promise<void> {

        const alreadyExists = await this.categoriesRepository.findByName(name);

        if (alreadyExists) {
            throw new AppError("This category is already created!");
        }
        this.categoriesRepository.create({ name, description });
    }
}

export { CreateCategoryUseCase };