import {Body, Controller, Post} from '@nestjs/common';
import {AuthService} from './auth.service';
import {CreateUserDto} from '../users/dto/create-user.dto';
import {UpdateUserDto} from '../users/dto/update-user.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {
    }

    @Post('register')
    register(@Body() regDto: CreateUserDto) {
        return this.authService.register(regDto);
    }

    @Post('login')
    login(@Body() loginDto: UpdateUserDto) {
        return this.authService.login(loginDto);
    }
}
