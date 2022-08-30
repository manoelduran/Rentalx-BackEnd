import { ISpecificationsRepository } from "@modules/cars/repositories/implementations/ISpecificationsRepository";
import {inject, injectable} from 'tsyringe';
import { AppError } from "@errors/AppError";
interface IRequest {
    name: string;
    description: string;
}

@injectable()
class CreateSpecificationsUseCase {
    constructor(
        @inject('SpecificationsRepository')
        private specificationsRepository: ISpecificationsRepository
        ) { }
   async execute({ name, description }: IRequest): Promise<void> {
        const alreadyExist = await this.specificationsRepository.findByName(name);
        if (alreadyExist) {
            throw new AppError("This specification already exists");
        };
       await this.specificationsRepository.create({
            name,
            description,
        });
    };
}

export { CreateSpecificationsUseCase };