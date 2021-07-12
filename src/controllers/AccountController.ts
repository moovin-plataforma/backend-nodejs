import { Request, Response } from 'express';
import { AccountService } from '../services/AccountService';

const AS = new AccountService();
const TAX = 0.90;

class AccountController{
    /**
     * @param {Object}  req                 Object with data from the request made.
     * @param {Object}  req.body            Object with data of the body of the request.
     * @param {Int}     req.body.code       Code to account.
     * @param {String}  req.body.owner      Owner account.
     * @param {Boolean} req.body.isSavings  To differentiate between account types (Savings and Current).
     **/
    async createAccount(req: Request, res: Response){
        const { code, owner, isSavings } = req.body;
        if(!code || !owner || !isSavings) return res.send({ error: "Dados Inválidos"});

        const codeExist = await AS.codeAlreadyExist(code);
        if(codeExist) return res.send({warning: "Este código de conta já está em uso"});

        const accountInfo = await AS.createAccount({code, owner, isSavings});
        return res.send(accountInfo);
    }
    /**
     * @param {Object}  req                           Object with data from the request made.
     * @param {Object}  req.body                      Object with data of the body of the request.
     * @param {Int}     req.body.code                 Code to account.
     * @param {String}  req.body.valueToWithdraw      Value to do withdraw.
     **/
    async withdraw(req: Request, res: Response){
        const { code, valueToWithdraw } = req.body;
        if(!code && (valueToWithdraw instanceof Number)) return res.send({ error: "Dados Inválidos"});

        const codeExist = AS.codeAlreadyExist(code);
        if(!codeExist) return res.send({error: "Nenhuma conta foi encontrada com este código"});

        if(valueToWithdraw > 600) return res.send({warning: "O valor informado excedeu o limite do Saque ( B$ 600 )"});
        else if(valueToWithdraw <= 0) return res.send({warning: "Valor de saque inválido"})

        if((await codeExist).balance >= valueToWithdraw){
            let newBalance = (await codeExist).balance - valueToWithdraw - TAX;
            const accountUpdated = await AS.updateBalance(code, newBalance);
            return res.send(`Saque efetuado, seu novo saldo é B$ ${accountUpdated.balance}`);
        }else{
            return res.send(`Saldo Insuficiente, seu saldo é de B$ ${(await codeExist).balance}`);
        }
    }
    /**
     * @param {Object}  req                          Object with data from the request made.
     * @param {Object}  req.body                     Object with data of the body of the request.
     * @param {Int}     req.body.code                Code to account.
     * @param {String}  req.body.valueToDeposit      Owner account.
     **/
     async deposit(req: Request, res: Response){
        const { code, valueToDeposit } = req.body;
        if(!code && (valueToDeposit instanceof Number)) return res.send({ error: "Dados Inválidos"});

        const codeExist = AS.codeAlreadyExist(code);
        if(!codeExist) return res.send({error: "Nenhuma conta foi encontrada com este código"});

        if(!(valueToDeposit > 0)) return res.send({warning: "Valor de depósito inválido"});

        let newBalance = (await codeExist).balance += valueToDeposit;
        const accountUpdated = await AS.updateBalance(code, newBalance);
        return res.send(`Depósito efetuado com sucesso, seu novo saldo é B$ ${accountUpdated.balance}`);
    }
    /**
     * @param {Object}  req                          Object with data from the request made.
     * @param {Object}  req.body                     Object with data of the body of the request.
     * @param {Int}     req.body.code                Code to account.
     **/
     async checkAccount(req: Request, res: Response){
        if(!req.params.code) return res.send({ error: "Dados Inválidos"});
        const code = parseInt(req.params.code);
        const codeExist = await AS.codeAlreadyExist(code);
        
        if(!codeExist) return res.send({error: "Nenhuma conta foi encontrada com este código"});
        return res.send(codeExist);
    }
}

export { AccountController };