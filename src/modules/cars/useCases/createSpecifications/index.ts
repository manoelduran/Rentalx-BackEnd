import { SpecificationsRepository } from "../../repositories/SpecificationsRepository";
import { CreateSpecificationsController } from "./createSpecificationsController";
import { CreateSpecificationsUseCase } from "./createSpecificationsUseCase";


const specificationsRepository = SpecificationsRepository.getInstance()
const creatSpecificationsUseCase = new CreateSpecificationsUseCase(specificationsRepository)
const createSpecificationsController = new CreateSpecificationsController(creatSpecificationsUseCase)

export { createSpecificationsController };