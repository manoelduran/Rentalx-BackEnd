import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";

import { getRepository, Repository } from "typeorm";

import { User } from "../entities/User";




class UsersRepository implements IUsersRepository {
    private repository: Repository<User>;
    constructor() {
        this.repository = getRepository(User);
    };
    async create({ name, avatar, id, email, password, driver_license }: ICreateUserDTO): Promise<void> {
        const user = this.repository.create({
            name,
            email,
            password,
            id,
            avatar,
            driver_license,
        });
        await this.repository.save(user);
    };
    async findByEmail(email: string): Promise<User> {
        const selectedUser = await this.repository.findOne({ email });
        return selectedUser;
    };
    async findById(id: string): Promise<User> {
        const selectedUser = await this.repository.findOne(id); // passa direto sem { } pq o id é padrão
        return selectedUser;
    };
};

export { UsersRepository };