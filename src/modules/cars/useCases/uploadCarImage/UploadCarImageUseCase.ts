import { ICarsImageRepository } from "@modules/cars/repositories/ICarsImageRepository";
import { inject, injectable } from "tsyringe";

interface IRequest {
    car_id: string;
    images: string[];
}
@injectable()
class UploadCarImageUseCase {
    constructor(
        @inject("CarsImagesRepository")
        private carsImageRepository: ICarsImageRepository
    ) { }
    async execute({
        car_id,
        images
    }: IRequest): Promise<void> {
        images.map(async (image) => {
            await this.carsImageRepository.create(car_id, image);
        });
    };
};

export { UploadCarImageUseCase };