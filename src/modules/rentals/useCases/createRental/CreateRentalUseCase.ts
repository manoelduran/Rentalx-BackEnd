import dayjs from "dayjs";
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";


interface IRequest {
    user_id: string;
    car_id: string;
    expected_return_date: Date;
}
@injectable()
class CreateRentalUseCase {
    constructor(
        @inject("RentalsRepository")
        private rentalsRepository: IRentalsRepository,
        @inject("DayjsDateProvider")
        private dateProvider: IDateProvider,
    ) { }
    async execute({
        user_id,
        car_id,
        expected_return_date
    }: IRequest): Promise<Rental> {
        const minimalHour = 24;
        const carAlreadyRented = await this.rentalsRepository.findCurrentRentalByCar(car_id);
        if (carAlreadyRented) {
            throw new AppError("This car is already rented!");
        };
        const carAlreadyRentedByUser = await this.rentalsRepository.findCurrentRentByUser(user_id);
        if (carAlreadyRentedByUser) {
            throw new AppError("This car is already rented by an user!");
        };
        const now = this.dateProvider.dateNow();
        const tomorrow = this.dateProvider.compareIsTomorrowInHours(expected_return_date, now);
        if (tomorrow < minimalHour) {
            throw new AppError("The minimal time to rent a car is 24 hours!")
        }
        console.log('tomorrow', tomorrow);
        const newRental = await this.rentalsRepository.create({
            user_id,
            car_id,
            expected_return_date

        });
        return newRental;
    };
};

export { CreateRentalUseCase };