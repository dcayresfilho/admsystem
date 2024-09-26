import { IsNumber, IsNumberString, IsOptional, IsString } from "class-validator";


export class updateDTO {
    @IsString()
    @IsOptional()
    name: string

    @IsString()
    @IsOptional()
    phone: number

    @IsString()
    @IsOptional()
    local: string

    @IsString()
    @IsOptional()
    birthday: string

}