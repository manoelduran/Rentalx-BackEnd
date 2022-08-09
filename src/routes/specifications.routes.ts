import { Router, Request, Response } from "express";
import { CreateSpecificationsController } from "../modules/cars/useCases/createSpecifications/createSpecificationsController";

const specificationsRoutes = Router();

const createSpecificationController = new CreateSpecificationsController();

specificationsRoutes.post("/", createSpecificationController.handle)

export { specificationsRoutes };