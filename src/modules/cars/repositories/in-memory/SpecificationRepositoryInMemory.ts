import { Specification } from "@modules/cars/infra/typeorm/entities/Specification";
import { ICreateSpecificationsDTO, ISpecificationsRepository } from "../ISpecificationsRepository";



class SpecificationsRepositoryInMemory implements ISpecificationsRepository {
    specifications: Specification[] = [];
    async create({ name, description }: ICreateSpecificationsDTO): Promise<Specification> {
        const specification = new Specification();
        Object.assign(specification, {
            name,
            description
        });
        this.specifications.push(specification);
        return specification;
    };
    async findByName(name: string): Promise<Specification> {
        return this.specifications.find(specification => specification.name === name);
    };
    async findById(ids: string[]): Promise<Specification[]> {
        const Allspecifications = this.specifications.filter(specification => ids.includes(specification.id))
        return Allspecifications;
    };
}

export { SpecificationsRepositoryInMemory };