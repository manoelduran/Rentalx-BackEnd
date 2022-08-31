interface ICreateUserDTO {
    name: string;
    id?: string;
    password: string;
    avatar?: string;
    email: string;
    driver_license: string;
}

export {ICreateUserDTO}