import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICarsRepository } from "../ICarsRepository";


class CarsRepositoryInMemory implements ICarsRepository {
    cars: Car[] = [];
    async create({
        brand,
        category_id,
        daily_rate,
        description,
        fine_amount,
        license_plate,
        name
    }: ICreateCarDTO): Promise<Car> {
        const car = new Car();
        Object.assign(car, {
            brand,
            category_id,
            daily_rate,
            description,
            fine_amount,
            license_plate,
            name
        });
        this.cars.push(car);
        return car;
    };
    async findByLicensePlate(license_plate: string): Promise<Car> {
        return this.cars.find(car => car.license_plate === license_plate);
    };
    async listCarsAvailable(name?: string, brand?: string, category_id?: string): Promise<Car[]> {
        const cars = this.cars.filter(car => {
            if (
                car.available === true || (
                    (brand && car.brand === brand) ||
                    (name && car.name === name) ||
                    (category_id && car.category_id === category_id)
                )
            ) {
                return car;
            }
            return null;
        })
        return cars;
    };
}

export { CarsRepositoryInMemory };