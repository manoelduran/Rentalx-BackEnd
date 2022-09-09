import { Request, Response } from "express";
import { container } from "tsyringe";
import { UploadCarImageUseCase } from "./UploadCarImageUseCase";

interface IFiles {
    filename: string;
}

class UploadCarImageController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;

        const images = request.files as IFiles[];

        const fileNames = images.map(file => file.filename);

        const uploadCarImageUseCase = container.resolve(UploadCarImageUseCase);

        const uploadCarImage = await uploadCarImageUseCase.execute(
            {
                car_id: id,
                images: fileNames,
            }
        );
        return response.status(201).json(uploadCarImage);
    };

};

export { UploadCarImageController };