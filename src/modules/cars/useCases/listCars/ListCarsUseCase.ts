import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { injectable, inject } from "tsyringe";
import { Car } from '../../infra/typeorm/entities/Car';




injectable()
class ListCarsUseCase {
    constructor(
        @inject("CarsRepository")
        private carsRepository: ICarsRepository
    ) { }
    async execute(name?: string,
        brand?: string,
        category_id?: string,): Promise<Car[]> {
        if (name) {
            const carsByName = await this.carsRepository.listCarsAvailable(name);
            return carsByName;
        };
        if (brand) {
            const carsByBrand = await this.carsRepository.listCarsAvailable(brand);
            return carsByBrand;
        };
        if (category_id) {
            const carsByCategory = await this.carsRepository.listCarsAvailable(category_id);
            return carsByCategory;
        };
        const cars = await this.carsRepository.listCarsAvailable();
        return cars;
    }
}

export { ListCarsUseCase };