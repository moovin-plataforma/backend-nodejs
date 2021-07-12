import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createAccount1626063148622 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "account",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true
                    },
                    {
                        name: "code",
                        type: "int",
                    },
                    {
                        name: "owner",
                        type: "varchar",
                    },
                    {
                        name: "balance",
                        type: "float",
                    },
                    {
                        name: "isSavings",
                        type: "boolean",
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()",
                    },
                    {
                        name: "updated_at",
                        type: "timestamp",
                        default: "now()",
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("account");
    }

}
