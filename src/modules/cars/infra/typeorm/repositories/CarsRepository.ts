import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { getRepository, Repository } from "typeorm";
import { Car } from "../entities/Car";


class CarsRepository implements ICarsRepository {
    private repository: Repository<Car>;
    constructor() {
        this.repository = getRepository(Car)
    }
    async create({
        brand,
        category_id,
        daily_rate,
        description,
        fine_amount,
        license_plate,
        name
    }: ICreateCarDTO): Promise<Car> {
        const newCar = this.repository.create({
            brand,
            category_id,
            daily_rate,
            description,
            fine_amount,
            license_plate,
            name,
        })
        await this.repository.save(newCar);
        return newCar;
    };
    async findByLicensePlate(license_plate: string): Promise<Car> {
        const selectedCar = await this.repository.findOne({ license_plate })
        return selectedCar;
    };
    async listCarsAvailable(name?: string, brand?: string, category_id?: string): Promise<Car[]> {
        if (name) {
            const listOfCarsByName = await this.repository.
            return listOfCarsByName;
        };
        if (brand) {
            const listOfCarsByBrand = await this.repository.
            return listOfCarsByBrand;
        };
        if (category_id) {
            const listOfCarsByCategory = await this.repository.
            return listOfCarsByCategory;
        };
        const listOfCars = await this.repository.find();
        return listOfCars;
    };
}

export { CarsRepository };