import {HttpException, Injectable, UnauthorizedException} from '@nestjs/common';
import {UsersService} from '../users/users.service';
import {JwtService} from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import {CreateUserDto} from '../users/dto/create-user.dto';
import {UpdateUserDto} from '../users/dto/update-user.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UsersService,
        private jwtService: JwtService,
    ) {
    }

    async register(regDto: CreateUserDto) {
        try {
            const candidate = await this.userService.getUserEmail(regDto.email);

            if (candidate) {
                throw `Пользователь с почтой '${regDto.email}' уже существует`;
            }

            const hashPassword = await bcrypt.hash(regDto.password, 10);
            const user = await this.userService.createUser({...regDto, password: hashPassword});
            return this.generateToken(user);
        } catch (error) {
            throw new HttpException(error, 400);
        }
    }

    async login(loginDto: UpdateUserDto) {
        try {
            const user = await this.validateUser(loginDto);
            return this.generateToken(user);
        } catch (error) {
            throw new UnauthorizedException({
                message: error,
            });
        }
    }

    private async validateUser(userDto: CreateUserDto) {
        try {
            const user = await this.userService.getUserEmail(userDto.email);

            if (!user) {
                throw 'Логин / Пароль неверны';
            }

            const hashPassword = await bcrypt.compare(userDto.password, user.password);

            if (!hashPassword) {
                throw 'Логин / Пароль неверны';
            }

            return user;
        } catch (error) {
            throw error;
        }
    }

    private async generateToken(user) {
        const payload = {email: user.email, id: user.id, role: user.role};
        return {
            token: this.jwtService.sign(payload),
        };
    }
}
