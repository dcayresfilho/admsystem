import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class agendamentoEntity {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    cliente: string

    @Column()
    data:  string

    @Column()
    hora: string

    @Column()
    valor: number

    @Column()
    procedimento: string

    @Column({nullable:true})
    obs: string
    
    @Column({nullable:true})
    urlPhoto: string

}