import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";


interface IRequest {
    id: string;
    user_id: string;
}
@injectable()
class DevolutionRentalUseCase {
    constructor(
        @inject("RentalsRepository")
        private rentalsRepository: IRentalsRepository,
        @inject("DayjsDateProvider")
        private dateProvider: IDateProvider,
        @inject("CarsRepository")
        private carsRepository: ICarsRepository,
    ) { }
    async execute({ user_id, id }: IRequest): Promise<Rental> {
        const selectedRental = await this.rentalsRepository.findById(id);
        const car = await this.carsRepository.findById(selectedRental.car_id);
        let total = 0;
        const minimal_daily = 1;
        if (!selectedRental) {
            throw new AppError("Rental does not exists!")
        }
        const dateNow = this.dateProvider.dateNow()
        let totalDaily = this.dateProvider.compareInDays(
            selectedRental.start_date,
            this.dateProvider.dateNow()
        )
        if (totalDaily <= 0) {
            totalDaily = minimal_daily;
        }
        const delay = this.dateProvider.compareInDays(
            dateNow,
            selectedRental.expected_return_date
        )
        if (delay > 0) {
            const calculateFine = delay * car.fine_amount;
            total = calculateFine;
        }
        total += totalDaily * car.daily_rate;
        selectedRental.end_date = this.dateProvider.dateNow()
        selectedRental.total = total;
        await this.rentalsRepository.create(selectedRental);
        await this.carsRepository.updateAvailable(car.id, true);
        return selectedRental;
    }
}

export { DevolutionRentalUseCase }