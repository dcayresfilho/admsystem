import { IsNumber, IsNumberString, IsString } from "class-validator";


export class createClienteDTO {
    @IsString()
    name: string

    @IsString()
    phone: number

    @IsString()
    local: string

    @IsString()
    birthday: string

}