import {forwardRef, Module} from '@nestjs/common';
import {JwtModule} from '@nestjs/jwt';
import {UsersModule} from '../users/users.module';
import {AuthController} from './auth.controller';
import {AuthService} from './auth.service';

@Module({
    exports: [AuthService, JwtModule],
    imports: [
        forwardRef(() => UsersModule),
        JwtModule.register({
            secret: process.env.SECRET_JWT_KEY || 'secret_key',
            signOptions: {expiresIn: '24h'},
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService],
})
export class AuthModule {
}
