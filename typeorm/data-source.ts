import { DataSource } from "typeorm";
import { userEntity } from "../src/users/entity/user.entity";
import { clienteEntity } from "../src/clients/entity/client.entity";
import { agendamentoEntity } from "../src/agendamentos/entity/agendamento.entity";

const dataSorce = new DataSource({
    type: 'sqlite',               
    database: 'database.sqlite',  
    entities: [userEntity, clienteEntity, agendamentoEntity], 
    synchronize: true,
    migrations: [`${__dirname}/migration/**/*.ts`]
})

export default dataSorce;