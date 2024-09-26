import { forwardRef, Module } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { ClientsController } from './clients.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { clienteEntity } from './entity/client.entity';

@Module({
    imports: [TypeOrmModule.forFeature([clienteEntity]), forwardRef(() => AuthModule)],
    providers: [ClientsService],
    controllers: [ClientsController],
    exports: [ClientsService, TypeOrmModule]
})
export class ClientsModule {}
