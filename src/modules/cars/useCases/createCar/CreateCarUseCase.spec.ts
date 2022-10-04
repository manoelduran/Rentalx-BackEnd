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
        const car = await createCarUseCase.execute({
            brand: "Brand",
            category_id: "category",
            daily_rate: 100,
            description: "Description Car",
            fine_amount: 60,
            license_plate: "ABC-1234",
            name: "Name Car",

        });
        expect(car).toHaveProperty("id");
    });

    it("Should not be able to create a car if the same license_plate", async () => {
        await createCarUseCase.execute({
            brand: "Brand",
            category_id: "category",
            daily_rate: 100,
            description: "Description Car",
            fine_amount: 60,
            license_plate: "ABC-1234",
            name: "Car1",

        });
        await expect(createCarUseCase.execute({
            brand: "Brand",
            category_id: "category",
            daily_rate: 100,
            description: "Description Car",
            fine_amount: 60,
            license_plate: "ABC-1234",
            name: "Car2",

        })
    ).rejects.toEqual(new AppError("Car already exists!"))
});
it("Should be able to create a car only with available is true by default", async () => {
    const car = await createCarUseCase.execute({
        brand: "Brand",
        category_id: "category",
        daily_rate: 100,
        description: "Description Car",
        fine_amount: 60,
        license_plate: "ABCD-1234",
        name: "Car Available",
    });
    console.log(car)
    expect(car.available).toBe(true)
})
})