import { AppError } from "@shared/errors/AppError";
import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { CreateUserUseCase } from "@modules/accounts/useCases/createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase"
import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { UsersTokensRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersTokenRepositorysInMemory";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";


let authenticateUserUseCase: AuthenticateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;
let dayjsDateProvider: DayjsDateProvider;

describe("Authenticate User", () => {
    beforeEach(() => {
        usersRepositoryInMemory = new UsersRepositoryInMemory();
        usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
        dayjsDateProvider = new DayjsDateProvider();
        authenticateUserUseCase = new AuthenticateUserUseCase(
            usersRepositoryInMemory,
            usersTokensRepositoryInMemory,
            dayjsDateProvider
        );
        createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
    })
    it("Should be able to auth a user", async () => {
        const user: ICreateUserDTO = {
            driver_license: "00321",
            email: "user@test.com",
            name: "User test",
            password: "1234"
        };
        await createUserUseCase.execute(user);
        const authenticatedUser = await authenticateUserUseCase.execute({
            email: user.email,
            password: user.password
        });
        console.log(authenticatedUser);
        expect(authenticatedUser).toHaveProperty("token")
    });
    it('Should not be able to auth a user that not exists', async () => {
        await expect(authenticateUserUseCase.execute({
            email: "false@email.com",
            password: "1234"
        })
        ).rejects.toEqual(new AppError("Email or password are incorrect! Try another one!"))
    });
    it('Should not be able to auth an user that have an incorrect password', async () => {
        const user: ICreateUserDTO = {
            driver_license: "3123123",
            email: "user@user.com",
            password: "1234",
            name: "User Name Error"
        };
        await createUserUseCase.execute(user);
        await expect(authenticateUserUseCase.execute({
            email: "user@user.com",
            password: "4321"
        })
        ).rejects.toEqual(new AppError("As senhas precisam ser iguais!"))
    });
});