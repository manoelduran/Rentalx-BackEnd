import { ISpecificationsRepository } from "../../repositories/implementations/ISpecificationsRepository";
interface IRequest {
    name: string;
    description: string;
}
class CreateSpecificationsUseCase {
    constructor(private specificationsRepository: ISpecificationsRepository) { }
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