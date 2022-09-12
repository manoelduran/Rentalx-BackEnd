import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";
import dayjs from "dayjs";
import { CreateRentalUseCase } from "./CreateRentalUseCase";

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
describe("Create Rental", () => {
    const addDay = dayjs().add(1, "day").toDate();
    beforeEach(() => {
        rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
        createRentalUseCase = new CreateRentalUseCase(rentalsRepositoryInMemory);
    })
    it("Should be able to rental a car", async () => {
        const rental = await createRentalUseCase.execute({
            user_id: "12345",
            car_id: "121212",
            expected_return_date: addDay,
        });
        expect(rental).toHaveProperty("id");
        expect(rental).toHaveProperty("start_date");
    });
    it("Should not be able to rental a car with another user are renting the same car", async () => {
        expect(async () => {
            await createRentalUseCase.execute({
                user_id: "12345",
                car_id: "121212",
                expected_return_date: addDay,
            });
            await createRentalUseCase.execute({
                user_id: "12345",
                car_id: "121212",
                expected_return_date: addDay,
            });
        }).rejects.toBeInstanceOf(AppError)
    });
    it("Should not be able to rental a car with are not available", async () => {
        expect(async () => {
            await createRentalUseCase.execute({
                user_id: "12345",
                car_id: "121212",
                expected_return_date: addDay,
            });
            await createRentalUseCase.execute({
                user_id: "123455",
                car_id: "121212",
                expected_return_date: addDay,
            });
        }).rejects.toBeInstanceOf(AppError);
    });
    it("Should not be able to rental a car if their time is smaller than 24 hours!", async () => {
        expect(async () => {
            await createRentalUseCase.execute({
                user_id: "12345",
                car_id: "121212",
                expected_return_date: dayjs().toDate(),
            });
        }).rejects.toBeInstanceOf(AppError);
    });
});