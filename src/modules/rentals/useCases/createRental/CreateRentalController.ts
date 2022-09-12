import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateRentalUseCase } from "./CreateRentalUseCase";


class CreateRentalController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { car_id, expected_return_date } = request.body;
        const { id } = request.user;
        const createRentalUseCase = container.resolve(CreateRentalUseCase);
        const newRental = await createRentalUseCase.execute({
            user_id: id,
            car_id,
            expected_return_date
        });
        return response.status(201).json(newRental);
    };
};

export { CreateRentalController };