import { container } from 'tsyringe';
import "@shared/container/providers";
import { CategoriesRepository } from '@modules/cars/infra/typeorm/repositories/CategoriesRepository';
import { SpecificationsRepository } from '@modules/cars/infra/typeorm/repositories/SpecificationsRepository';
import { UsersRepository } from '@modules/accounts/infra/typeorm/repositories/UsersRepository';
import { ICategoriesRepository } from '@modules/cars/repositories/ICategoriesRepository';
import { ISpecificationsRepository } from '@modules/cars/repositories/ISpecificationsRepository';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { CarsRepository } from '@modules/cars/infra/typeorm/repositories/CarsRepository';
import { ICarsImageRepository } from '@modules/cars/repositories/ICarsImageRepository';
import { CarsImageRepository } from '@modules/cars/infra/typeorm/repositories/CarsImageRepository';
import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository';
import { RentalsRepository } from '@modules/rentals/infra/typeorm/repositories/RentalsRepository';
import { IUsersTokensRepository } from '@modules/accounts/repositories/IUsersTokensRepository';
import { UsersTokensRepository } from '@modules/accounts/infra/typeorm/repositories/UsersTokensRepository';
import { IStorageProvider } from './providers/StorageProvider/IStorageProvider';
import { LocalStorageProvider } from './providers/StorageProvider/implementations/LocalStorageProvider';
import { S3StorageProvider } from './providers/StorageProvider/implementations/S3StorageProvider';



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

container.registerSingleton<ICarsRepository>(
    "CarsRepository",
    CarsRepository
)

container.registerSingleton<ICarsImageRepository>(
    "CarsImageRepository",
    CarsImageRepository
)

container.registerSingleton<IRentalsRepository>(
    "RentalsRepository",
    RentalsRepository
)

container.registerSingleton<IUsersTokensRepository>(
    "UsersTokensRepository",
    UsersTokensRepository
)

const diskStorage = {
    local: LocalStorageProvider,
    s3: S3StorageProvider
}
container.registerSingleton<IStorageProvider>(
    "StorageProvider",
    diskStorage[process.env.disk]
)