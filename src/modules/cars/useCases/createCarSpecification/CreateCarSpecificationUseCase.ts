import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { ISpecificationsRepository } from "@modules/cars/repositories/ISpecificationsRepository";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

interface IRequest {
    car_id: string;
    specifications_id: string[];
}

// @injectable()
class CreateCarSpecificationUseCase {
    constructor(
        // @inject("CarsRepository")
        private carsRepository: ICarsRepository,
        private specificationsRepository: ISpecificationsRepository
    ) { }
    async execute({ car_id, specifications_id }: IRequest): Promise<Car> {
        const selectedCarById = await this.carsRepository.findById(car_id);
        if (!selectedCarById) {
            throw new AppError("Car not found!");
        };
        const specifications = await this.specificationsRepository.findById(
            specifications_id
        );
        selectedCarById.specifications = specifications;
        await this.carsRepository.create(selectedCarById);

        return selectedCarById;
    };
};

export { CreateCarSpecificationUseCase };