import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";


interface IRequest {
    name: string;
    description: string;
}

class CreateCategoryUseCase {
    constructor(private categoriesRepository: ICategoriesRepository) { }
    execute({ name, description }: IRequest): void {

        const alreadyExists = this.categoriesRepository.findByName(name);

        if (alreadyExists) {
            throw new Error("This category is already created!");
        }
        this.categoriesRepository.create({ name, description });
    }
}

export { CreateCategoryUseCase };