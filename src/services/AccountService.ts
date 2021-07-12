import { getCustomRepository, createConnection } from "typeorm";
import { AccountRepositories } from "../repositories/AccountRepositories";

class AccountService {
    /**
     * @param code Code to account.
     */
    async codeAlreadyExist(code: number){
        const AR = getCustomRepository(AccountRepositories);
        const alreadyExist = await AR.findOne({
            where: {code: code}
        });
        return alreadyExist;
    }
    /**
     * @param {Object}  data            Object with infos to create account.
     * @param {Int}     data.code       Code to account.
     * @param {String}  data.owner      Owner account.
     * @param {Boolean} data.isSavings  To differentiate between account types (Savings and Current).
     **/
    async createAccount(data: any){
        const AR = getCustomRepository(AccountRepositories);
        const account = await AR.create(data);
        await AR.save(account);
        return account;
    }
    /**
     * @param code           Code to account.
     * @param newBalance     New Balance to account.
     */
     async updateBalance(code: Boolean, newBalance: number){
        const AR = getCustomRepository(AccountRepositories);
        const accountInfo = await AR.findOne({
            where: {code: code}
        })
        accountInfo.balance = newBalance;
        AR.save(accountInfo);
        return accountInfo;
    }
}

export { AccountService };
