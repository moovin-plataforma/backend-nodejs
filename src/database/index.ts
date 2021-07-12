import { createConnection } from "typeorm";
import { Account } from '../entities/Account';

createConnection({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "kruser123",
    database: "DB_MVN",
    entities: [ Account ],
    migrations: ['src/database/migration/*.js'],
    synchronize: true,
}).then(connection => {
    // here you can start to work with your entities
}).catch(error => console.log(error));