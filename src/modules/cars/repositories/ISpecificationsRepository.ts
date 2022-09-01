import { Specification } from "@modules/cars/infra/typeorm/entities/Specification";



interface ICreateSpecificationsDTO {
    name: string;
    description: string;
};

interface ISpecificationsRepository {
    create({ name, description }: ICreateSpecificationsDTO): Promise<void>;
    findByName(name: string): Promise<Specification>;
    // list(): ICreateSpecificationsDTO;
}

export { ISpecificationsRepository, ICreateSpecificationsDTO }