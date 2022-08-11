import { container } from 'tsyringe';
import { IUsersRepository } from '../../modules/accounts/repositories/implementations/IUsersRepository';
import { UsersRepository } from '../../modules/accounts/repositories/UsersRepository';
import { CategoriesRepository } from '../../modules/cars/repositories/CategoriesRepository';
import { ICategoriesRepository } from '../../modules/cars/repositories/implementations/ICategoriesRepository';
import { ISpecificationsRepository } from '../../modules/cars/repositories/implementations/ISpecificationsRepository';
import { SpecificationsRepository } from '../../modules/cars/repositories/SpecificationsRepository';


// ICategoriesRepository
container.registerSingleton<ICategoriesRepository>(
    "CategoriesRepository",
    CategoriesRepository
)

container.registerSingleton<ISpecificationsRepository>(
    "SpecificationsRepository",
    SpecificationsRepository
)

container.registerSingleton<IUsersRepository>(
    "UsersRepository",
    UsersRepository
)