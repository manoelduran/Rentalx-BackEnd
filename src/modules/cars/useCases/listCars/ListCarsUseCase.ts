import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { injectable, inject } from "tsyringe";
import { Car } from '../../infra/typeorm/entities/Car';


interface IRequest {
    brand?: string;
    category_id?: string;
    name?: string;
};

injectable()
class ListCarsUseCase {
    constructor(
        @inject("CarsRepository")
        private carsRepository: ICarsRepository
    ) { }
    async execute({
        brand,
        category_id,
        name
    }: IRequest): Promise<Car[]> {
        const cars = await this.carsRepository.listCarsAvailable(brand, category_id, name)
        console.log('carsUSECASE', cars)
        return cars;
    }
}

export { ListCarsUseCase };