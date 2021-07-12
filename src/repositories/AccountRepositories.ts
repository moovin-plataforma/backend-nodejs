import { EntityRepository, Repository } from "typeorm";
import { Account } from "../entities/Account";

@EntityRepository(Account)
class AccountRepositories extends Repository<Account>{

}

export { AccountRepositories };