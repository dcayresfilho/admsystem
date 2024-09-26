import { BadRequestException, Injectable, UnauthorizedException, UseGuards } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { clienteEntity } from './entity/client.entity';
import { Repository } from 'typeorm';
import { createClienteDTO } from './dto/clienteDTO';
import { AuthGuard } from '../guard/auth.guard/auth.guard';
import { updateDTO } from './dto/updateDTO';

@Injectable()
export class ClientsService {
    constructor(
    @InjectRepository(clienteEntity)
    private clienteRepository: Repository<clienteEntity>) {}

    async createClient(createClienteDTO: createClienteDTO) {
        if( await this.clienteRepository.exists({where: {phone: createClienteDTO.phone}})) {
            throw new UnauthorizedException('Um cliente com esse telefone ja existe')
        }

        const cliente = this.clienteRepository.create(createClienteDTO)
        return this.clienteRepository.save(cliente)
    }

    listClient(){
        return this.clienteRepository.find()
    }

    async listOneClint(id: number) {
        
        const user = await this.clienteRepository.findOne({where: {id: id}})
        
        if(!user) {
            throw new UnauthorizedException('Cliente não existe')
        }
 
        return user
    }

    async deleteClient(id: number){
        
        if(!(await this.clienteRepository.exists({where: {id: id}}))){
            throw new UnauthorizedException('Usuario não existe')
        }

        return this.clienteRepository.delete(id)
    }

    async updateClient(id: number, {name, phone, local, birthday}: updateDTO){
        if(!(await this.clienteRepository.exists({where: {id: id}}))) {
            throw new UnauthorizedException('Cliente não existe')
        }

        const dados: any = {}

        if(name) {
            dados.name = name
        } 
        if(phone) {
            dados.phone = phone
        }
        if(local) {
            dados.local = local
        }
        if(birthday) {
            dados.birthday = birthday
        }

        try {await this.clienteRepository.update(id, dados) }
        catch(e){ throw new BadRequestException(e)}

        return true

    }

}
