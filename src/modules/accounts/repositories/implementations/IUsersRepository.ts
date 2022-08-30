import { ICreateUserDTO } from "@modules/dtos/ICreateUserDTO";
import { User } from "modules/accounts/entities/User";



interface IUsersRepository {
    create(data: ICreateUserDTO): Promise<void>;
    findByEmail(email: string): Promise<User>;
    findById(id: string): Promise<User>;
}

export { IUsersRepository }