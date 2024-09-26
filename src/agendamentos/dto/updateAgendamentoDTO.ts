import { IsOptional, IsString,  } from "class-validator";

export class updateAgendamentoDTO {
    @IsOptional()
    @IsString()
    cliente: string

    @IsOptional()
    @IsString()
    data:  string

    @IsOptional()
    @IsString()
    hora: string

    @IsOptional()
    @IsString()
    valor: number

    @IsOptional()
    @IsString()
    procedimento: string

    @IsOptional()
    @IsString()
    obs: string
    
    @IsOptional()
    @IsString()
    urlPhoto: string
}