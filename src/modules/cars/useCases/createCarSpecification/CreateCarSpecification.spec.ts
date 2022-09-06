import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { SpecificationsRepositoryInMemory } from "@modules/cars/repositories/in-memory/SpecificationRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";
import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase"

let specificationsRepositoryInMemory: SpecificationsRepositoryInMemory;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let createCarSpecificationUseCase: CreateCarSpecificationUseCase;

describe("Create Car Specification", () => {
    beforeEach(() => {
        specificationsRepositoryInMemory = new SpecificationsRepositoryInMemory()
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        createCarSpecificationUseCase = new CreateCarSpecificationUseCase(carsRepositoryInMemory, specificationsRepositoryInMemory);
    });

    it("Should not be able to add a new specifiation for an car", async () => {
        expect(async () => {
            const car_id = "12345";
            const specifications_id = ["54321"];
            await createCarSpecificationUseCase.execute({
                car_id,
                specifications_id
            });
        }).rejects.toBeInstanceOf(AppError)
    });
    it("Should be able to add a new specifiation for a car", async () => {
        const car = await carsRepositoryInMemory.create({
            brand: "Brand",
            category_id: "category",
            daily_rate: 100,
            description: "Description Car",
            fine_amount: 60,
            license_plate: "ABC-1234",
            name: "Name Car",
        });
        const specification = await specificationsRepositoryInMemory.create({
            description: "test",
            name: "test"
        });
        const specifications_id = [specification.id];
       const result = await createCarSpecificationUseCase.execute({
            car_id: car.id,
            specifications_id
        });
        expect(result).toHaveProperty("specifications");
        expect(result.specifications.length).toBe(1);
    });
})