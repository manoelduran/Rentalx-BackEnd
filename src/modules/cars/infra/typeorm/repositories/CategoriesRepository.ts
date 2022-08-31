import { getRepository, Repository } from "typeorm";
import { ICategoriesRepository, ICreateCategoryDTO } from "@modules/cars/repositories/implementations/ICategoriesRepository";
import { Category } from "../entities/Category";

class CategoriesRepository implements ICategoriesRepository {
    private repository: Repository<Category>;
    // private static INSTANCE: CategoriesRepository;
     constructor() {
        this.repository = getRepository(Category);
    };
    // public static getInstance(): CategoriesRepository {
    //     if (!CategoriesRepository.INSTANCE) {
    //         CategoriesRepository.INSTANCE = new CategoriesRepository();
    //     }
    //     return CategoriesRepository.INSTANCE;
    // }
    async create({ name, description }: ICreateCategoryDTO): Promise<void> {
        const category = this.repository.create({
            description,
            name,
        });

        await this.repository.save(category);
    };

    async list(): Promise<Category[]> {
        const categories = await this.repository.find();
        return categories;
    };

   async findByName(name: string): Promise<Category> {
    // Select * from categories where name = "name"
        const selectedCategory = await this.repository.findOne({name});
        return selectedCategory;
    }
};

export { CategoriesRepository }