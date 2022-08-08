import { Specification } from "../../entities/Specification";


interface ICreateSpecificationsDTO {
    name: string;
    description: string;
};

interface ISpecificationsRepository {
    create({ name, description }: ICreateSpecificationsDTO): void;
    findByName(name: string): Specification;
    // list(): ICreateSpecificationsDTO;
}

export { ISpecificationsRepository, ICreateSpecificationsDTO }