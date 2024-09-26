import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthService } from '../../auth/auth.service';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const token = request.cookies['authToken']; // Busca o token JWT no cookie chamado 'jwt'

    if (!token) {
      return false;
    }

    try {
      const decodedUser = this.authService.checkToken(token); 
      request.user = decodedUser; 
      return true;
    } catch (e) {
      return false;
    }
  }
}
