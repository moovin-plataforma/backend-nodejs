# MOOVIN CHALLENGE

## Instruções

Em um pequeno país do planeta Cyber, a moeda vigente é o biteris cuja sigla é B$.
Você precisa desenvolver um algoritmo para um caixa eletrônico, seguindo os requisitos descritos abaixo:

    [ X ] O banco possui dois tipos de conta: Conta Corrente e Conta Poupança; (Está sendo diferenciado com isSavings)

    [ X ] Limite de Saque: B$ 600,00;

    [ X ] Cada operação de Saque possui uma taxa de operação que deve ser descontado do saldo: B$ 0,30;

    [ X ] O recurso de Depósito deve receber um código de conta e o valor a ser depositado;

    [ X ] O recurso de Saque deve receber um código de conta e o valor a ser retirado 

    [ X ] Validar se a conta possui saldo e se o valor não excede o limite;

## Extra

Para dificultar ainda mais o desafio e aproveitar meus estudos com postgreSQL e typeORM, adicionei ao projeto banco de dados

    [ x ] Criar conexão com banco de dados;

    [ x ] Migrations;

    [ X ] Repositories;

    [ X ] CRU;

# Rotas

Method: Post -> /createAccount -> Rota para criar conta poupança e corrente.
    
    body
    {
        "code": 123,
        "owner": "teste",
        "isSavings": true (Se verdadeiro, a conta é poupança)
    }

Method: Post -> /withdraw -> Rota para sacar.
    
    body
    {
        "code": 123,
        "valueToWithdraw": 50
    }

Method: Post -> /deposit -> Rota para depositar.
    
    body
    {
        "code": 123,
        "valueToDeposit": 50
    }

Method: Post -> /checkAccount/:code -> Rota para verificar.
