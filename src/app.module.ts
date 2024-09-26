import { forwardRef, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { userEntity } from './users/entity/user.entity';
import { userModule } from './users/user.module';
import { AuthModule } from './auth/auth.module';
import { ClientsModule } from './clients/clientes.module';
import { ClientsService } from './clients/clients.service';
import { clienteEntity } from './clients/entity/client.entity';
import { AgendamentosModule } from './agendamentos/agendamentos.module';
import { agendamentoEntity } from './agendamentos/entity/agendamento.entity';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports:[
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'front/dist/sysadmin/browser')
    }),
    ThrottlerModule.forRoot([{ ttl: 60, limit: 100 }]),
    forwardRef(() => userModule) ,
    forwardRef(() => AuthModule) ,
    TypeOrmModule.forRoot({
      type: 'sqlite',               
      database: 'database.sqlite',  
      entities: [userEntity, clienteEntity, agendamentoEntity], 
      synchronize: true,            
    }),
    ClientsModule,
    AgendamentosModule,
  ],
  controllers: [AppController],
  providers: [AppService, ClientsService,
    { provide: APP_GUARD,
      useClass: ThrottlerGuard
     }
  ],
})
export class AppModule {}
