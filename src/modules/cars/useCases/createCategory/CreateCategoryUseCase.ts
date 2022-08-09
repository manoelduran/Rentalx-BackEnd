import { ICategoriesRepository } from "../../repositories/implementations/ICategoriesRepository";
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
            throw new Error("This category is already created!");
        }
        this.categoriesRepository.create({ name, description });
    }
}

export { CreateCategoryUseCase };