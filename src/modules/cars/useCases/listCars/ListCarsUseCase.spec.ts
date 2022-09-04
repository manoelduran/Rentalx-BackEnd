import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { ListCarsUseCase } from "./ListCarsUseCase"

let listCarsUseCase: ListCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;
describe("List Cars", () => {
    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        listCarsUseCase = new ListCarsUseCase(carsRepositoryInMemory);
    });
    it("Should be able to list all availables cars", async () => {
        const newCar = await carsRepositoryInMemory.create({
            brand: "Brand 2",
            category_id: "cf26cfc1-cdfc-41de-9a0f-68c01dba0e47",
            daily_rate: 140,
            description: "Nice car",
            fine_amount: 80,
            license_plate: "BBC-4321",
            name: "Car 2"
        });
        const cars = await listCarsUseCase.execute({});
        expect(cars).toEqual([newCar]);
    });
    it("Should be able to list all available cars by brand", async () => {
        const newCar = await carsRepositoryInMemory.create({
            brand: "Brand 5",
            category_id: "cf26cfc1-cdfc-41de-9a0f-68c01dba0e47",
            daily_rate: 140,
            description: "Nice car",
            fine_amount: 80,
            license_plate: "BBC-4321",
            name: "Car 2"
        });
        const cars = await listCarsUseCase.execute({brand: "Brand 5"});
        expect(cars).toEqual([newCar]);
    });
    it("Should be able to list all available cars by name", async () => {
        const newCar = await carsRepositoryInMemory.create({
            brand: "Brand 5",
            category_id: "cf26cfc1-cdfc-41de-9a0f-68c01dba0e47",
            daily_rate: 140,
            description: "Nice car",
            fine_amount: 80,
            license_plate: "BBC-4321",
            name: "Car 2"
        });
        const cars = await listCarsUseCase.execute({name: "Car 2"});
        expect(cars).toEqual([newCar]);
    });
    it("Should be able to list all available cars by category", async () => {
        const newCar = await carsRepositoryInMemory.create({
            brand: "Brand 5",
            category_id: "cf26cfc1-cdfc-41de-9a0f-68c01dba0e47",
            daily_rate: 140,
            description: "Nice car",
            fine_amount: 80,
            license_plate: "BBC-4321",
            name: "Car 2"
        });
        const cars = await listCarsUseCase.execute({category_id: "cf26cfc1-cdfc-41de-9a0f-68c01dba0e47"});
        expect(cars).toEqual([newCar]);
    });
});