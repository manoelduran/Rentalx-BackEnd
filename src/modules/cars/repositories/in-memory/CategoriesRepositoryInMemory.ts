import { Category } from "@modules/cars/entities/Category";
import { ICategoriesRepository, ICreateCategoryDTO } from "@modules/cars/repositories/implementations/ICategoriesRepository";


class CategoriesRepositoryInMemory implements ICategoriesRepository {
    categories: Category[] = [];
    async findByName(name: string): Promise<Category> {
        const selectedCategory = this.categories.find(category => category.name === name);
        return selectedCategory;
    }
    async create({ name, description }: ICreateCategoryDTO): Promise<void> {
        const category = new Category();
        Object.assign(category, {
            name,
            description
        });
        this.categories.push(category);
    }
    async list(): Promise<Category[]> {
        const listOfCategories = this.categories;
        return listOfCategories
    }
}

export { CategoriesRepositoryInMemory}