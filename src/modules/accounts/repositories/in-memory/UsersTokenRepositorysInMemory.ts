import { ICreateUsersTokensDTO } from "@modules/accounts/dtos/ICreateUsersTokensDTO";
import { UserTokens } from "@modules/accounts/infra/typeorm/entities/UserTokens";
import { IUsersTokensRepository } from "../IUsersTokensRepository";


class UsersTokensRepositoryInMemory implements IUsersTokensRepository {
    usersTokens: UserTokens[] = [];
    async create({ user_id, expires_date, refresh_token }: ICreateUsersTokensDTO): Promise<UserTokens> {
        const userToken = new UserTokens();
        Object.assign(userToken, {
            user_id,
            expires_date,
            refresh_token
        })
        this.usersTokens.push(userToken);
        return userToken;
    }
    async findByUserIdAndRefreshToken(user_id: string, refresh_token: string): Promise<UserTokens> {
        const userToken = this.usersTokens.find(token => token.id === user_id && token.refresh_token === refresh_token);
        return userToken;
    }
    async findByRefreshToken(refresh_token: string): Promise<UserTokens> {
        const userToken = this.usersTokens.find(token => token.refresh_token === refresh_token);
        return userToken;
    }
    async deleteById(id: string): Promise<void> {
        const userToken = this.usersTokens.find(token => token.id === id);
        this.usersTokens.splice(this.usersTokens.indexOf(userToken));
    }

}

export { UsersTokensRepositoryInMemory }