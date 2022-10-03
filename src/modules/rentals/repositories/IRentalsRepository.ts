import { ICreateRentalDTO } from "../dtos/ICreateRentalDTO";
import { Rental } from "../infra/typeorm/entities/Rental";



interface IRentalsRepository {
    create(data: ICreateRentalDTO): Promise<Rental>;
    findCurrentRentalByCar(car_id: string): Promise<Rental>;
    findCurrentRentByUser(user_id: string): Promise<Rental>;
    findById(id: string): Promise<Rental>;
};

export { IRentalsRepository };