import { AppError } from "@errors/AppError";
import { ICreateUserDTO } from "@modules/dtos/ICreateUserDTO";
import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { CreateUserUseCase } from "@modules/accounts/useCases/createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase"

let authenticateUserUseCase: AuthenticateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;

describe("Authenticate User", () => {
    beforeEach(() => {
        usersRepositoryInMemory = new UsersRepositoryInMemory();
        authenticateUserUseCase = new AuthenticateUserUseCase(usersRepositoryInMemory);
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
    it('Should not be able to auth a user that not exists', () => {
        expect(async () => {
            await authenticateUserUseCase.execute({
                email: "false@email.com",
                password: "1234"
            });
        }).rejects.toBeInstanceOf(AppError);
    });
    it('Should not be able to auth an user that have an incorrect password', () => {
        expect(async () => {
            const user: ICreateUserDTO = {
                driver_license: "3123123",
                email: "user@user.com",
                password: "1234",
                name: "User Name Error"
            };
            await createUserUseCase.execute(user);
          const result =  await authenticateUserUseCase.execute({
                email: "user@user.com",
                password: "4321"
            });
            console.log('result', result)
        }).rejects.toBeInstanceOf(AppError);
    });
});