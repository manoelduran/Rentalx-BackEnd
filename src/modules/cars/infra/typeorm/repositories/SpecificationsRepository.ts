import { ICreateSpecificationsDTO, ISpecificationsRepository } from "@modules/cars/repositories/ISpecificationsRepository";
import { getRepository, Repository } from "typeorm";

import { Specification } from "../entities/Specification";


class SpecificationsRepository implements ISpecificationsRepository {
    private repository: Repository<Specification>

    constructor() {
        this.repository = getRepository(Specification)
    }

    async create({ name, description }: ICreateSpecificationsDTO): Promise<Specification> {
        const specification = this.repository.create({
            description,
            name
        });
        await this.repository.save(specification);
        return specification;
    };
    async findByName(name: string): Promise<Specification> {
        const selectedSpecification = await this.repository.findOne({ name });
        return selectedSpecification;
    }
    async findById(ids: string[]): Promise<Specification[]> {
        const specifications = await this.repository.findByIds(ids);
        return specifications
    }
};

export { SpecificationsRepository };