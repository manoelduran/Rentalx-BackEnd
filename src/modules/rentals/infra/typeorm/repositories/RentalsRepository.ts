import { ICreateRentalDTO } from "@modules/rentals/dtos/ICreateRentalDTO";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { getRepository, Repository } from "typeorm";
import { Rental } from "../entities/Rental";


class RentalsRepository implements IRentalsRepository {
    private repository: Repository<Rental>
    constructor() {
        this.repository = getRepository(Rental)
    }

    async create({ user_id, car_id, expected_return_date, id, end_date, total }: ICreateRentalDTO): Promise<Rental> {
        const newRental = this.repository.create({
            user_id,
            car_id,
            expected_return_date,
            id,
            end_date,
            total
        });
        await this.repository.save(newRental);
        return newRental;
    }
    async findCurrentRentalByCar(car_id: string): Promise<Rental> {
        const selectedRentalByCar = await this.repository.findOne({
            where: { car_id, end_date: null }
        });
        return selectedRentalByCar;
    }
    async findCurrentRentByUser(user_id: string): Promise<Rental> {
        const selectedRentalByUser = await this.repository.findOne({
            where: { user_id, end_date: null }
        });
        return selectedRentalByUser;
    }
    async findById(id: string): Promise<Rental> {
        const selectedRental = await this.repository.findOne(id);
        return selectedRental;
    }
   async findByUser(user_id: string): Promise<Rental[]> {
        const selectedRental = await this.repository.find({
            where: {user_id},
            relations: ["car"]
        })
        return selectedRental;
    }
}

export { RentalsRepository };