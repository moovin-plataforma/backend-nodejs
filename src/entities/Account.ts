import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";
import {v4 as uuid} from "uuid"

@Entity("account")
class Account {
    @PrimaryColumn()
    readonly id: string;

    @Column()
    code: number;

    @Column()
    owner: string;

    @Column('float', {default: 0})
    balance: number;

    @Column()
    isSavings: boolean;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    constructor(){
        if(!this.id) this.id = uuid();
    }
}
export { Account };