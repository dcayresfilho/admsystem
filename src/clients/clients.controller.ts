import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { createClienteDTO } from './dto/clienteDTO';
import { AuthGuard } from '../guard/auth.guard/auth.guard';
import { updateDTO } from './dto/updateDTO';

@Controller('clients')
export class ClientsController {
    constructor (private readonly clientService: ClientsService) {}

    @UseGuards(AuthGuard)
    @Post()
    createClient(@Body() createClienteDTO: createClienteDTO){
        return this.clientService.createClient(createClienteDTO)
    }
    
    @UseGuards(AuthGuard)
    @Get()
    listClients() {
        return this.clientService.listClient()
    }
    
    @UseGuards(AuthGuard)
    @Get(':id')
    listOneClients(@Param('id') id: number) {
        return this.clientService.listOneClint(id)
    }

    @UseGuards(AuthGuard)
    @Delete(':id')
    deleteClient(@Param('id') id: number) {
        return this.clientService.deleteClient(id)
    }

    @UseGuards(AuthGuard)
    @Patch(':id')
    updateClint(@Param('id') id: number, @Body() dados: updateDTO) {
        return this.clientService.updateClient(id, dados)
    }

}
