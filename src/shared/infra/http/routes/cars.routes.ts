import { CreateCarController } from '@modules/cars/useCases/createCar/CreateCarController';
import { Router } from 'express';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';
import { ensureIsAdmin } from '../middlewares/ensureIsAdmin';

const carsRoutes = Router();

const createCarController = new CreateCarController();

carsRoutes.post("/", ensureAuthenticated, ensureIsAdmin, createCarController.handle)

export { carsRoutes };