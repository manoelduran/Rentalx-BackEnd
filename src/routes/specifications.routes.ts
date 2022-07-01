import { Router, Request, Response } from "express";
import { createSpecificationsController } from "../modules/cars/useCases/createSpecifications";

const specificationsRoutes = Router();

specificationsRoutes.post("/", (request: Request, response: Response) => {
    return createSpecificationsController.handle(request, response);
})

export { specificationsRoutes };