import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

interface IRequest {
    name: string;
    description: string;
    daily_rate: number
    license_plate: string;
    fine_amount: number;
    brand: string;
    created_at: Date;
    category_id: string;
};

@injectable()
class CreateCarUseCase {
    constructor(
        @inject("CarsRepository")
        private carsRepository: ICarsRepository
    ) { }
    async execute({ brand,
        category_id,
        daily_rate,
        description,
        fine_amount,
        license_plate,
        created_at,
        name }: IRequest): Promise<void> {

        const carAlreadyExists = await this.carsRepository.findByLicensePlate(license_plate);
        if (carAlreadyExists) {
            throw new AppError("Car already exists!");
        };
        await this.carsRepository.create({
            brand,
            category_id,
            daily_rate,
            description,
            fine_amount,
            license_plate,
            created_at,
            name
        })
    };
};

export { CreateCarUseCase };