import { Request, Response } from "express";
import { container } from "tsyringe";
import { SendForgotPasswordMailUseCase } from "./SendForgotPasswordMailUseCase";


class SendForgotPasswordMailController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { email } = request.body;
        const sendForgotPasswordMailUseCase = container.resolve(SendForgotPasswordMailUseCase)
        const send = await sendForgotPasswordMailUseCase.execute(email)
        return response.status(200).json(send)
    }
}

export { SendForgotPasswordMailController }