import { getRepository, Repository } from "typeorm";
import { ICreateSpecificationsDTO, ISpecificationsRepository } from "@modules/cars/repositories/implementations/ISpecificationsRepository";
import { Specification } from "../entities/Specification";


class SpecificationsRepository implements ISpecificationsRepository {
    private repository: Repository<Specification>

    constructor() {
        this.repository = getRepository(Specification)
    }

    async create({ name, description }: ICreateSpecificationsDTO): Promise<void> {
        const specification = this.repository.create({
            description,
            name
        });
        await this.repository.save(specification);
    };
    async findByName(name: string): Promise<Specification> {
        const selectedSpecification = await this.repository.findOne({name});
        return selectedSpecification;
    }
};

export { SpecificationsRepository };