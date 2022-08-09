import { parse } from 'csv-parse';
import { ICategoriesRepository } from '../../repositories/implementations/ICategoriesRepository';
import fs from 'fs';
import {inject, injectable} from 'tsyringe';


interface IImportCategory {
    name: string;
    description: string;
}

@injectable()
class ImportCategoryUseCase {
    constructor(
        @inject('CategoriesRepository')
        private categoriesRepository: ICategoriesRepository
        ) { }

    loadCategories(file: Express.Multer.File): Promise<IImportCategory[]> {
        return new Promise((resolve, reject) => {
            const stream = fs.createReadStream(file.path); // stream de leitura para ler o arquivo
            const categories: IImportCategory[] = [];
            const parseFile = parse();
            stream.pipe(parseFile);
            parseFile.on("data", async (line) => {
                const [name, description] = line;
                categories.push({
                    name,
                    description
                });
            }).on("end", () => {
                fs.promises.unlink(file.path);
                resolve(categories);
            }).on("error", (err) => {
                reject(err);
            })

        })
    }
    async execute(file: Express.Multer.File): Promise<void> {
        const categories = await this.loadCategories(file);
        categories.map(category => {
            const { name, description } = category;
            const alreadyExists = this.categoriesRepository.findByName(name);
            if (alreadyExists) {
                throw new Error("This specification already exists");
            };
            this.categoriesRepository.create({
                name, description
            });
        })
    };

}

export { ImportCategoryUseCase };