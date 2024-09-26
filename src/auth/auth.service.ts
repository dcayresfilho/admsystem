import { BadRequestException, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { userEntity } from '../users/entity/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
    private issuer = 'Login';
    private audience = 'Users';

    constructor (private readonly JwtService: JwtService,
                 @InjectRepository(userEntity)
                 private userRepository: Repository<userEntity>

    ) {}

    createToken(user: userEntity) {
        return this.JwtService.sign({
                sub: user.id,
                name: user.name,
                email: user.email
            }, {
                expiresIn: '15 days',
                issuer: this.issuer,
                audience: this.audience
            })

    }

    checkToken(token: string) {
        try {
            const data = this.JwtService.verify(token, {
                audience: this.audience,
                issuer: this.issuer
            })
            return data
        }catch(e) {
            throw new BadRequestException('Token inválido ou expirado.')
        }

    }

    isValid(token: string) {
        try{
            this.checkToken(token);
            return true
        } catch(e) {
            throw new UnauthorizedException('Invalid Token')
        }
    }

    async login(email:string, password:string) {
        const user = await this.userRepository.findOneBy({email})

        if (!user) {
            throw new UnauthorizedException('Não encontrado')
        }

        if (!(await bcrypt.compare(password, user.password))) {
            throw new UnauthorizedException('Não encontrado')
        }

        return this.createToken(user)

    }

 
}

