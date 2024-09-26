import { BadRequestException, Body, Controller, Post, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { loginDTO } from './dto/loginDTO';
import { Request, Response } from 'express';

@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService
    ) {}

    @Post('login')
    async login(@Body() {email, password}: loginDTO, @Res({passthrough: true}) res: Response) {
        const jwt = await this.authService.login(email, password)

        res.cookie('authToken', jwt, {
            httpOnly: true,
            secure: false,
            sameSite: 'lax'
        })

        return {message: 'Login Ok'}
    }

    @Post('verifyToken')
    async vrfToken(@Req() request: Request) {
        const token = request.cookies.authToken; 

        if (!token) {
            throw new BadRequestException('JWT must be provided');
        }

        return this.authService.checkToken(token);
    }

    @Post('validaToken') 
    async validToken(@Req() request: Request) {
        const token = request.cookies.authToken; 

        if (!token) {
            throw new BadRequestException('JWT must be provided');
        }

        return this.authService.isValid(token)

    }


    @Post('logout')
    logout(@Res() res: Response) {
        res.clearCookie('authToken')
        return res.status(200).json({message: 'logout Ok'})
    }

}
