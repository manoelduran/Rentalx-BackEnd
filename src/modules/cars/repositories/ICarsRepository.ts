import { ICreateCarDTO } from "../dtos/ICreateCarDTO";
import { Car } from "../infra/typeorm/entities/Car";

interface ICarsRepository {
    create(data: ICreateCarDTO): Promise<Car>;
    findByLicensePlate(license_plate: string): Promise<Car>;
    listCarsAvailable(name?: string, brand?: string, category_id?: string): Promise<Car[]>;
}

export { ICarsRepository };