import { Request, Response } from "express";
import { ListCarsUseCase } from "./ListCarsUseCase";
import { container } from "tsyringe";



class ListCarsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { brand, category_id, name } = request.query;
    const listCarsUseCase =  container.resolve(ListCarsUseCase)
    const listAvailableCars = await listCarsUseCase.execute({
      brand: brand as string,
      category_id: category_id as string,
      name: name as string,
    });
    return response.status(200).json(listAvailableCars);
  }
}

export { ListCarsController };