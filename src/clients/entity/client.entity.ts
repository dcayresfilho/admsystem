import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity('clientes')
export class clienteEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string

    @Column()
    phone: number

    @Column()
    birthday: string

    @Column()
    local: string

}