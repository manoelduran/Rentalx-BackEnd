import { Specification } from "@modules/cars/infra/typeorm/entities/Specification";



interface ICreateSpecificationsDTO {
    name: string;
    description: string;
};

interface ISpecificationsRepository {
    create({ name, description }: ICreateSpecificationsDTO): Promise<Specification>;
    findByName(name: string): Promise<Specification>;
    findById(id: string[]): Promise<Specification[]>
}

export { ISpecificationsRepository, ICreateSpecificationsDTO }