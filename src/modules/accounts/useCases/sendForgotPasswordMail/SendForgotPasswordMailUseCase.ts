import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { v4 as uuidV4 } from 'uuid';
import { resolve } from 'path';
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { IMailProvider } from "@shared/container/providers/MailProvider/IMailProvider";

@injectable()
class SendForgotPasswordMailUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository,
        @inject("UsersTokensRepository")
        private usersTokensRepository: IUsersTokensRepository,
        @inject("DayjsDateProvider")
        private dayjsDateProvider: IDateProvider,
        @inject("MailProvider")
        private etherealMailProvider: IMailProvider
    ) { }
    async execute(email: string): Promise<void> {
        const user = await this.usersRepository.findByEmail(email);
        const templatePath = resolve(__dirname, "..", "..", "views", "emails", "forgotPassword.hbs");
        if (!user) {
            throw new AppError("User does not exists!");
        };
        const token = uuidV4();

        const expires_date = this.dayjsDateProvider.addHours(3);

        await this.usersTokensRepository.create({
            refresh_token: token,
            user_id: user.id,
            expires_date
        });
        const variables = {
            name: user.name,
            link: `${process.env.FORGOT_MAIL_URL}${token}`,
        }
        await this.etherealMailProvider.sendMail(
            email,
            "Recuperação de senha",
            variables,
            templatePath
        )
    }
}

export { SendForgotPasswordMailUseCase }