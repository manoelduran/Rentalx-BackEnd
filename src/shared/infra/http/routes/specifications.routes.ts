import { CreateSpecificationsController } from "@modules/cars/useCases/createSpecifications/createSpecificationsController";
import { Router } from "express";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { ensureIsAdmin } from "../middlewares/ensureIsAdmin";

const specificationsRoutes = Router();

const createSpecificationController = new CreateSpecificationsController();
specificationsRoutes.post("/", ensureAuthenticated, ensureIsAdmin, createSpecificationController.handle)

export { specificationsRoutes };