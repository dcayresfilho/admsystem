import { forwardRef, Module } from '@nestjs/common';
import { AgendamentosService } from './agendamentos.service';
import { AgendamentosController } from './agendamentos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { agendamentoEntity } from './entity/agendamento.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([agendamentoEntity]), forwardRef(() => AuthModule), ],
  providers: [AgendamentosService],
  controllers: [AgendamentosController],
  exports: [TypeOrmModule, AgendamentosService]
})
export class AgendamentosModule {}
