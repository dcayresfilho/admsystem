import { IsEmail, IsString, IsStrongPassword } from "class-validator";


export class createUserDTO{
    @IsString()
    name: string
    
    @IsStrongPassword()
    password: string
    
    @IsEmail()
    email: string
}