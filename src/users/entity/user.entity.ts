import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class userEntity {

    @PrimaryGeneratedColumn()
    id: number

    @Column({})
    name: string

    @Column({})
    password: string

    @Column({unique: true})
    email: string

}