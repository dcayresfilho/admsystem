import { IsDate, IsNumber, IsOptional, IsString,  } from "class-validator";

export class agendamentoDTO {
    @IsString()
    cliente: string

    @IsString()
    data:  string

    @IsString()
    hora: string

    @IsString()
    valor: number

    @IsString()
    procedimento: string

    @IsOptional()
    @IsString()
    obs: string

    @IsOptional()
    urlPhoto: string
}