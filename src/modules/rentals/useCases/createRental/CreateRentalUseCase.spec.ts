import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { AppError } from "@shared/errors/AppError";
import dayjs from "dayjs";
import { CreateRentalUseCase } from "./CreateRentalUseCase";

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let dayjsDateProvider: DayjsDateProvider;
describe("Create Rental", () => {
    const addDay = dayjs().add(1, "day").toDate();
    beforeEach(() => {
        rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        dayjsDateProvider = new DayjsDateProvider();
        createRentalUseCase = new CreateRentalUseCase(rentalsRepositoryInMemory, dayjsDateProvider, carsRepositoryInMemory);
    })
    it("Should be able to rental a car", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Test",
            description: "Car Test",
            daily_rate: 100,
            license_plate: "test",
            fine_amount: 40,
            category_id: "1234",
            brand: "brand"
        })
        const rental = await createRentalUseCase.execute({
            user_id: "12345",
            car_id: car.id,
            expected_return_date: addDay,
        });
        expect(rental).toHaveProperty("id");
        expect(rental).toHaveProperty("start_date");
    });
    it("Should not be able to rental a car with another user are renting the same car", async () => {
    await rentalsRepositoryInMemory.create({
        car_id: "1111",
        expected_return_date: addDay,
        user_id: "12345"
      })
        await expect(createRentalUseCase.execute({
            user_id: "12345",
            car_id: "121212",
            expected_return_date: addDay,
        })
        ).rejects.toEqual(new AppError("This car is already rented by an user!"))
    });
    it("Should not be able to rental a car with are not available", async () => {
        await rentalsRepositoryInMemory.create({
            car_id: "121212",
            expected_return_date: addDay,
            user_id: "12345"
          })
        await expect(
            createRentalUseCase.execute({
                user_id: "123455",
                car_id: "121212",
                expected_return_date: addDay,
            })
        ).rejects.toEqual(new AppError("This car is already rented!"))
    });
    it("Should not be able to rental a car if their time is smaller than 24 hours!", async () => {
        await expect(
            createRentalUseCase.execute({
                user_id: "12345",
                car_id: "121212",
                expected_return_date: dayjs().toDate(),
            })
        ).rejects.toEqual(new AppError("The minimal time to rent a car is 24 hours!"))
    });
});