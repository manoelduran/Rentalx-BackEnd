import { Category } from "../../entities/Category";
import { ICategoriesRepository } from "../../repositories/implementations/ICategoriesRepository";

class ListCategoriesUseCase {
    constructor(private categoriesRepository: ICategoriesRepository) { }
    execute(): Category[] {
        const categories = this.categoriesRepository.list();
        return categories;
    };
};

export { ListCategoriesUseCase };