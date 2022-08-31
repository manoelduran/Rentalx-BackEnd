import { container } from 'tsyringe';
import { IUsersRepository } from '@modules/accounts/repositories/implementations/IUsersRepository';

import { ICategoriesRepository } from '@modules/cars/repositories/implementations/ICategoriesRepository';
import { ISpecificationsRepository } from '@modules/cars/repositories/implementations/ISpecificationsRepository';
import { CategoriesRepository } from '@modules/cars/infra/typeorm/repositories/CategoriesRepository';
import { SpecificationsRepository } from '@modules/cars/infra/typeorm/repositories/SpecificationsRepository';
import { UsersRepository } from '@modules/accounts/infra/typeorm/repositories/UsersRepository';



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