import { IsEmail, IsOptional, IsString, IsStrongPassword } from "class-validator";


export class updateUserDTO{
    @IsOptional()
    @IsString()
    name: string
    
    @IsOptional()
    @IsStrongPassword()
    password: string
    
    @IsOptional()
    @IsEmail()
    email: string
}