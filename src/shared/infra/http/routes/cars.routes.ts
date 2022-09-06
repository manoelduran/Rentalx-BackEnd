import { CreateCarController } from '@modules/cars/useCases/createCar/CreateCarController';
import { CreateCarSpecificationController } from '@modules/cars/useCases/createCarSpecification/CreateCarSpecificationController';
import { ListCarsController } from '@modules/cars/useCases/listCars/ListCarsController';
import { Router } from 'express';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';
import { ensureIsAdmin } from '../middlewares/ensureIsAdmin';

const carsRoutes = Router();

const createCarController = new CreateCarController();
const listCarsController = new ListCarsController();
const createCarSpecificationController = new CreateCarSpecificationController();

carsRoutes.post("/", ensureAuthenticated, ensureIsAdmin, createCarController.handle);

carsRoutes.get("/available", listCarsController.handle);

carsRoutes.post("/specifications/:id", ensureAuthenticated, ensureIsAdmin, createCarSpecificationController.handle);


export { carsRoutes };