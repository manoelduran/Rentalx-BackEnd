import { ICreateRentalDTO } from "@modules/rentals/dtos/ICreateRentalDTO";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { getRepository, Repository } from "typeorm";
import { Rental } from "../entities/Rental";


class RentalsRepository implements IRentalsRepository {
    private repository: Repository<Rental>
    constructor() {
        this.repository = getRepository(Rental)
    }

    async create({ user_id, car_id, expected_return_date }: ICreateRentalDTO): Promise<Rental> {
        const newRental = this.repository.create({
            user_id,
            car_id,
            expected_return_date
        });
        await this.repository.save(newRental);
        return newRental;
    }
    async findCurrentRentalByCar(car_id: string): Promise<Rental> {
        const selectedRentalByCar = await this.repository.findOne({ car_id });
        return selectedRentalByCar;
    }
    async findCurrentRentByUser(user_id: string): Promise<Rental> {
        const selectedRentalByUser = await this.repository.findOne({ user_id });
        return selectedRentalByUser;
    }
    async findById(id: string): Promise<Rental> {
        const selectedRental = await this.repository.findOne(id);
        return selectedRental;
    }
}

export { RentalsRepository };