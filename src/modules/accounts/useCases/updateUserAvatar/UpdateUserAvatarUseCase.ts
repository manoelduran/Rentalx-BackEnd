import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { IStorageProvider } from "@shared/container/providers/StorageProvider/IStorageProvider";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";




interface IRequest {
    user_id: string;
    avatarFile: string;
}

// Adicionar coluna avatar na tabela de usuários
// Refatorar o usuário com coluna avatar
// Configuração upload multer
// Criar regra de negócio do upload
// Criar controller
@injectable()
class UpdateUserAvatarUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository,
        @inject("StorageProvider")
        private storageProvider: IStorageProvider,
    ) { }
    async execute({ user_id, avatarFile }: IRequest): Promise<void> {
        const selectedUser = await this.usersRepository.findById(user_id);
        if (!selectedUser) {
            throw new AppError("User does not exists!");
        }
        if (selectedUser.avatar) {
            await this.storageProvider.delete(selectedUser.avatar, "avatar");
        }
        await this.storageProvider.save(avatarFile, "avatar");
        selectedUser.avatar = avatarFile;
        await this.usersRepository.create(selectedUser);
    }
}

export { UpdateUserAvatarUseCase };