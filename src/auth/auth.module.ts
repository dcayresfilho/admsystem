import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { userModule } from '../users/user.module';

@Module({
  imports: [JwtModule.register({
    secret: String(process.env.JWT_SECRET)
  }),
  forwardRef(() => userModule)
],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService]
})
export class AuthModule {}
