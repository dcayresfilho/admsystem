import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { userEntity } from "./entity/user.entity";
import { userService } from "./user.service";
import { userController } from "./user.controller";
import { AuthModule } from "../auth/auth.module";
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from "path";


@Module({
    imports: [TypeOrmModule.forFeature([userEntity]), forwardRef(() => AuthModule),
    ServeStaticModule.forRoot({rootPath: join(__dirname, '..', 'storage'), serveRoot: '/storage/'})],
    providers: [userService],
    controllers: [userController],
    exports: [userService, TypeOrmModule]
})
export class userModule {}