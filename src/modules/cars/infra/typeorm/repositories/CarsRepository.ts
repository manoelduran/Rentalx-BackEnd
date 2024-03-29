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
        name,
        specifications,
        id
    }: ICreateCarDTO): Promise<Car> {
        const newCar = this.repository.create({
            brand,
            category_id,
            daily_rate,
            description,
            fine_amount,
            license_plate,
            name,
            specifications,
            id
        })
        await this.repository.save(newCar);
        return newCar;
    };
    async findByLicensePlate(license_plate: string): Promise<Car> {
        const selectedCar = await this.repository.findOne({ license_plate })
        return selectedCar;
    };
    async listCarsAvailable(brand?: string, category_id?: string, name?: string): Promise<Car[]> {
        console.log('brand', brand, category_id, name)
        const carsQuery = await this.repository
            .createQueryBuilder("c")
            .where("available = :available", { available: true });
        if (brand) {
            carsQuery.andWhere("brand = :brand", { brand })
        };
        if (category_id) {
            carsQuery.andWhere("category_id = :category_id", { category_id })
        };
        if (name) {
            carsQuery.andWhere("name = :name", { name })
        };
        const cars = await carsQuery.getMany();
        console.log('cars', cars)
        return cars;
    };
    async findById(car_id: string): Promise<Car> {
        const car = await this.repository.findOne(car_id);
        return car;
    };
    async updateAvailable(id: string, available: boolean): Promise<void> {
        await this.repository.createQueryBuilder()
            .update()
            .set({ available })
            .where("id = :id")
            .setParameters({ id })
            .execute();
    }
};

export { CarsRepository };