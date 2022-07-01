import { SpecificationsRepository } from "../../repositories/SpecificationsRepository";
interface IRequest {
    name: string;
    description: string;
}
class CreateSpecificationsUseCase {
    constructor(private specificationsRepository: SpecificationsRepository) { }
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