import { InjectRepository } from '@nestjs/typeorm';
import { agendamentoEntity } from './entity/agendamento.entity';
import { Raw, Repository } from 'typeorm';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { agendamentoDTO } from './dto/agendamentoDTO';
import { updateAgendamentoDTO } from './dto/updateAgendamentoDTO';

@Injectable()
export class AgendamentosService {
    constructor(
        @InjectRepository(agendamentoEntity)
        private agendaRepository: Repository<agendamentoEntity>,
    ) {}
    

    async create(agendamentoDTO: agendamentoDTO) {
        if(await this.agendaRepository.exists({where: {data: agendamentoDTO.data, hora: agendamentoDTO.hora}})){
            throw new UnauthorizedException('Ja existe um agendamento para essa data e hora')
        }

        const agendamento = this.agendaRepository.create(agendamentoDTO)

        return this.agendaRepository.save(agendamento)
    }

    async list() {
        return this.agendaRepository.find()
    }

    async delete(id: number) {
        if(!(await this.agendaRepository.exists({where: {id: id}}))) {
            throw new UnauthorizedException('Agendamento inexistente')
        }

        return this.agendaRepository.delete(id)
    }

    async update(id: number, {cliente, data, hora, valor, procedimento, obs, urlPhoto}: updateAgendamentoDTO) {
        if(!(await this.agendaRepository.exists({where: {id: id}}))) {
            throw new UnauthorizedException('Agendamento inexistente')
        }

        const dados: any = {}

        if(cliente){
            dados.cliente = cliente
        }
        if(data){
            dados.data = data
        }
        if(hora){
            dados.hora = hora
        }
        if(valor){
            dados.valor = valor
        }
        if(procedimento){
            dados.procedimento = procedimento
        }
        if(obs){
            dados.obs = obs
        }
        if(urlPhoto){
            dados.urlPhoto = urlPhoto
        }

        return this.agendaRepository.update(id, dados)
    }


    agendamentosMes(){
        const now = new Date();
        const currentMonth = (now.getMonth() + 1).toString().padStart(2, '0'); 
        const currentYear = now.getFullYear();

  return this.agendaRepository.find({
    where: {
      data: Raw(alias => `strftime('%Y-%m', ${alias}) = '${currentYear}-${currentMonth}'`)
    }
  });
}


async agendamentosDia() {
    return await this.agendaRepository.find({
      where: {
        data: Raw(alias => `date(${alias}) = date('now')`)
      }
    });
  }

  async agendasCliente(nome: string) {
    return await this.agendaRepository.findBy({ cliente: nome });
  }

  async agendaSeletor(data: string) {
    return await this.agendaRepository.findBy({ data: data });
  }
  
  

}
