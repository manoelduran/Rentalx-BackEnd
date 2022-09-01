import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";
import { CreateCarUseCase } from "./CreateCarUseCase"

let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("Create Car", () => {
    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
    })
    it("Should be able to create a new car", async () => {
        await createCarUseCase.execute({
            brand: "Brand",
            category_id: "category",
            daily_rate: 100,
            description: "Description Car",
            fine_amount: 60,
            license_plate: "ABC-1234",
            created_at: new Date(),
            name: "Name Car",

        });
    });

    it("Should not be able to create a car if the same license_plate", async () => {
      await  expect(async () => {
           await createCarUseCase.execute({
                brand: "Brand",
                category_id: "category",
                daily_rate: 100,
                description: "Description Car",
                fine_amount: 60,
                license_plate: "ABC-1234",
                created_at: new Date(),
                name: "Car1",

            });
            await createCarUseCase.execute({
                brand: "Brand",
                category_id: "category",
                daily_rate: 100,
                description: "Description Car",
                fine_amount: 60,
                license_plate: "ABC-1234",
                created_at: new Date(),
                name: "Car2",

            });
        }).rejects.toBeInstanceOf(AppError);
    });
})