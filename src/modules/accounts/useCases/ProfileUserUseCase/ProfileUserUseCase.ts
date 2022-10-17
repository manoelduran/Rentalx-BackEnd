import { IUserResponseDTO } from "@modules/accounts/dtos/IUserResponseDTO";
import { UserMap } from "@modules/accounts/mapper/UserMap";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { inject, injectable } from "tsyringe";


interface IRequest {
    id: string;
}

@injectable()
class ProfileUserUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ) { }
    async execute({ id }: IRequest): Promise<IUserResponseDTO> {
        const user = await this.usersRepository.findById(id);
        return UserMap.toDTO(user);
    }
}

export { ProfileUserUseCase }