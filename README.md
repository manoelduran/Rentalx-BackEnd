
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
    ** Requisitos não funcionais **

    ** Regra de negócio **
    Não deve ser possivel cadastrar uma especificação em um carro não cadastrado;
    Não deve ser possível cadastrar uma especificação já existente para o mesmo carro;
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
    O usuário deve estar logado na aplicação;
    Ao Realizar um aluguel, o status do carro deverá ser alterado para indisponivel;
}

#Devolução de carro {
     ** Requisitos funcionais **
    Deve ser possível realizar a devolução de um carro

    ** Requisitos não funcionais **
    Utilizar o multer para upload dos arquivos;

    ** Regra de negócio **
   Se o carro for devolvido com menos de 24 horas, deverá ser cobrado diária completa;
   Ao realizar a devolução, o carro deverá ser liberado para outro aluguel;
   Ao realizar a devolução, o usuário deverá ser liberado para outro aluguel;
   Ao realizar a devolução, deverá ser calculado o total do aluguel;
   Caso haja multa, deverá ser somado ao total do aluguel;
   O usuário deve estar logado na aplicação;
}

#Listagem de Alugueis para usuário {
     ** Requisitos funcionais **
    Deve ser possível realizar a busca de todos os alugueis para o usuário

    ** Requisitos não funcionais **


    ** Regra de negócio **
    O usuário deve estar logado na aplicação
}

