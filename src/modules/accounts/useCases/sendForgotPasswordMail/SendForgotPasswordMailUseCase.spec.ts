import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { UsersTokensRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersTokenRepositorysInMemory";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { MailProviderInMemory } from "@shared/container/providers/MailProvider/in-memory/MailProviderInMemory";
import { AppError } from "@shared/errors/AppError";
import { SendForgotPasswordMailUseCase } from "./SendForgotPasswordMailUseCase"


let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let dayjsDateProvider: DayjsDateProvider;
let mailProviderInMemory: MailProviderInMemory;

describe("Send Forgot Mail", () => {
    beforeEach(() => {
        usersRepositoryInMemory = new UsersRepositoryInMemory();
        usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
        dayjsDateProvider = new DayjsDateProvider();
        mailProviderInMemory = new MailProviderInMemory();
        sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
            usersRepositoryInMemory,
            usersTokensRepositoryInMemory,
            dayjsDateProvider,
            mailProviderInMemory
        );
    })
    it("Should be able to send an forgot password mail to user!", async () => {
        const sendMail = jest.spyOn(mailProviderInMemory, "sendMail");
        const user = {
            driver_license: "66543",
            email: "manoel.duran@hotmail.com",
            name: "Manoel Duran",
            password: "123456",
        }
        await usersRepositoryInMemory.create(user);
        await sendForgotPasswordMailUseCase.execute(user.email);
        expect(sendMail).toHaveBeenCalled();
    });
    it("Should not be able to send an email if user does not exists!", async () => {
        await expect(
            sendForgotPasswordMailUseCase.execute("tiodoemail@email.com")
        ).rejects.toEqual(new AppError("User does not exists!"))
    });
    it("Should be able to create an usersToken", async () => {
        const generateTokenMail = jest.spyOn(usersTokensRepositoryInMemory, "create");
        const user = {
            driver_license: "6666",
            email: "manoelcduran@gmail.com",
            name: "Manoel Duran 2",
            password: "123456",
        }
        await usersRepositoryInMemory.create(user);
        await sendForgotPasswordMailUseCase.execute(user.email);
        expect(generateTokenMail).toBeCalled();
    })
}) 