import { Body, Controller, Delete, FileTypeValidator, Get, MaxFileSizeValidator, Param, ParseFilePipe, Patch, Post, UnauthorizedException, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from '../guard/auth.guard/auth.guard';
import { agendamentoDTO } from './dto/agendamentoDTO';
import { AgendamentosService } from './agendamentos.service';
import { updateAgendamentoDTO } from './dto/updateAgendamentoDTO';
import { FileInterceptor } from '@nestjs/platform-express';
import { mkdir, writeFile } from 'fs/promises';
import { join } from 'path';

@Controller('agendamentos')
export class AgendamentosController {

constructor(private readonly agendamentoService: AgendamentosService,

) {}


@UseGuards(AuthGuard)
@UseInterceptors(FileInterceptor('file'))
@Post('photo')
async uploadPhoto(
    @UploadedFile(new ParseFilePipe({
        validators: [
            new FileTypeValidator({ fileType: 'image/png' }),
            new MaxFileSizeValidator({ maxSize: 10 * 1024 * 1024 })
        ]
    })) photo: Express.Multer.File
) {

    await mkdir(join(__dirname, '..', 'storage', 'photos'), { recursive: true });
    const ids: any = await this.list()
    let ultimo = ids[ids.length -1]
            try {
                let photoName: string
                if(ultimo && ultimo.id){ photoName = `photo-agenda-${ultimo.id +1}.png`
                } else {
                    photoName = 'photo-agenda-1.png'
                }
                
                await writeFile(join(__dirname, '..', 'storage', 'photos', photoName), photo.buffer);
                return { success: true, fileUrl: `http://localhost:3000/storage/photos/${photoName}` };
            } catch (e) {
                console.log(ultimo)
                throw new UnauthorizedException('Não é possivel subir essa imagem')
            }
    
}

@UseGuards(AuthGuard)
@UseInterceptors(FileInterceptor('file'))
@Post('updatePhoto')
async updatePhoto(
    @UploadedFile(new ParseFilePipe({
        validators: [
            new FileTypeValidator({ fileType: 'image/png' }),
            new MaxFileSizeValidator({ maxSize: 10 * 1024 * 1024 })
        ]
    })) photo: Express.Multer.File, @Body('id') id: number
) {

            try {
                let photoName = `photo-agenda-${id}.png`
                await writeFile(join(__dirname, '..', 'storage', 'photos', photoName), photo.buffer);
                return { success: true, fileUrl: `http://localhost:3000/storage/photos/${photoName}` };
            }
             catch (e) {
                throw new UnauthorizedException('Não é possivel subir essa imagem')
            }
        }     

@UseGuards(AuthGuard)
@Post()
async create(@Body() agendamentoDTO: agendamentoDTO) {

    if(!agendamentoDTO.urlPhoto) {
        const ids: any = await this.list()
        let ultimo = ids[ids.length -1]
        let photoName: string
        if(ultimo && ultimo.id){ photoName = `photo-agenda-${ultimo.id +1}.png`
        } else {
            photoName = 'photo-agenda-1.png'
        }
        
        agendamentoDTO.urlPhoto = `http://localhost:3000/storage/photos/${photoName}`;
    }

    agendamentoDTO.data = agendamentoDTO.data.substring(0, 10)

    return await this.agendamentoService.create(agendamentoDTO)

}

@UseGuards(AuthGuard)
@Get()
list() {
    return this.agendamentoService.list()
}


@UseGuards(AuthGuard)
@Patch(':id')
async update(@Param('id') id:number, @Body() updateAgendamentoDTO: updateAgendamentoDTO) {

    const photoName = `photo-agenda-${id}.png`

    updateAgendamentoDTO.urlPhoto = `http://localhost:3000/storage/photos/${photoName}`;

    console.log(id)

    return this.agendamentoService.update(id, updateAgendamentoDTO)
}

@UseGuards(AuthGuard)
@Delete(':id')
delete(@Param('id') id:number) {
    return this.agendamentoService.delete(id)
}

@UseGuards(AuthGuard)
@Get('agendaMes')
agendaMes() {
    return this.agendamentoService.agendamentosMes()
}

@UseGuards(AuthGuard)
@Get('agendaHoje')
async agendaHoje() {
    const agendamentos = await this.agendamentoService.agendamentosDia()

    return Array.isArray(agendamentos) ? agendamentos: [agendamentos]
}

@UseGuards(AuthGuard)
@Post('agendaCliente')
async agendaClient(@Body('cliente') nome: string) {

  return  await this.agendamentoService.agendasCliente(nome);
}

@UseGuards(AuthGuard)
@Post('agendaSeletor')
async agendaSeletor(@Body('data') data: string) {

  return  await this.agendamentoService.agendaSeletor(data);
}



}
