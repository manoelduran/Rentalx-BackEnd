
#Cadastro do Carro {
    ** Requisitos funcionais **
    Deve ser possível cadastrar um novo carro;

    ** Regra de negócio **
    Não deve ser possível cadastrar um carro com uma placa já existente;
    O carro deve ser cadastrado com disponibilidade 'true' por padrão;

}

#Listagem de Carros {
    ** Requisitos funcionais **
    Deve ser possível listar todos os carros disponiveis;
    Deve ser possível listar todos os carros disponiveis pelo nome da categoria;
    Deve ser possível listar todos os carros disponiveis pelo nome da marca;
    Deve ser possível listar todos os carros disponiveis pelo nome do carro;
    ** Requisitos não funcionais **

    ** Regra de negócio **
    O usuário não precisa estar logado no sistema;

}

#Cadastro de Especificação no Carro {
    ** Requisitos funcionais **
    Deve ser possível cadastrar uma especificação para um carro;
    Deve ser possível listar todas as especificações;
    Deve ser possível listar todos os carros;
    ** Requisitos não funcionais **

    ** Regra de negócio **
    Não deve ser possivel cadastrar uma especificação em um carro não cadastrado;
    Não deve ser possível cadastrar uma especificação já existente para o mesmo carro;
    O carro deve ser cadastrado com disponibilidade 'true' por padrão;
}


#Cadastro de Imagens do Carro {
    ** Requisitos funcionais **
    Deve ser possível cadastrar a imagem do carro;
    Deve ser possível listar todos os carros;

    ** Requisitos não funcionais **
    Utilizar o multer para upload dos arquivos;

    ** Regra de negócio **
    O usuário deve poder cadastrar mais de uma imagem para o mesmo carro;
    O usuário responsável pelo cadastro deve ser um usuário administrador;
}

#Aluguel de carro {
    ** Requisitos funcionais **
    Deve ser possível cadastrar um aluguel;

    ** Requisitos não funcionais **
    Utilizar o multer para upload dos arquivos;

    ** Regra de negócio **
    O aluguel deve ter duração mínima de 24 horas;
    Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo usuário;
    Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo carro;
}