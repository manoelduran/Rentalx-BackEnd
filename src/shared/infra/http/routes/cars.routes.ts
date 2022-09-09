import upload from '@config/upload';
import { CreateCarController } from '@modules/cars/useCases/createCar/CreateCarController';
import { CreateCarSpecificationController } from '@modules/cars/useCases/createCarSpecification/CreateCarSpecificationController';
import { ListCarsController } from '@modules/cars/useCases/listCars/ListCarsController';
import { UploadCarImageController } from '@modules/cars/useCases/uploadCarImage/UploadCarImageController';
import { Router } from 'express';
import multer from 'multer';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';
import { ensureIsAdmin } from '../middlewares/ensureIsAdmin';

const carsRoutes = Router();
const uploadCarImage = multer(upload.upload("./tmp/cars"));
const createCarController = new CreateCarController();
const listCarsController = new ListCarsController();
const createCarSpecificationController = new CreateCarSpecificationController();
const uploadCarImageController = new UploadCarImageController();

carsRoutes.post("/", ensureAuthenticated, ensureIsAdmin, createCarController.handle);

carsRoutes.get("/available", listCarsController.handle);

carsRoutes.post("/specifications/:id", ensureAuthenticated, ensureIsAdmin, createCarSpecificationController.handle);

carsRoutes.post("/images/:id", ensureAuthenticated, ensureIsAdmin, uploadCarImage.array("images"), uploadCarImageController.handle);

export { carsRoutes };