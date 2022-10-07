import { container } from "tsyringe";
import { IDateProvider } from "./DateProvider/IDateProvider";
import { DayjsDateProvider } from "./DateProvider/implementations/DayjsDateProvider";
import { EtherealMailProvider } from "./MailProvider/implementations/EtherealMailProvider";


container.registerSingleton<IDateProvider>(
    "DayjsDateProvider",
    DayjsDateProvider
)


container.registerInstance<IMailProvider>(
    "EtherealMailProvider",
    new EtherealMailProvider()
)