import { ISpecificationsRepository } from "../../repositories/implementations/ISpecificationsRepository";
import {inject, injectable} from 'tsyringe';
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
    execute({ name, description }: IRequest): void {
        const alreadyExist = this.specificationsRepository.findByName(name);
        if (alreadyExist) {
            throw new Error("This specification already exists");
        };
        this.specificationsRepository.create({
            name,
            description,
        });
    };
}

export { CreateSpecificationsUseCase };