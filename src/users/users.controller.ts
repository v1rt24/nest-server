import {Body, Controller, Delete, Get, Param, Post, Put, UseGuards, UsePipes} from '@nestjs/common';
import {UsersService} from './users.service';
import {User} from './user.model';
import {CreateUserDto} from './dto/create-user.dto';
import {UpdateUserDto} from './dto/update-user.dto';
import {JwtAuthGuard} from '../auth/jwt-auth.guard';

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService) {
    }

    @Post()
    createUser(@Body() userData: CreateUserDto): Promise<User> {
        return this.userService.createUser(userData);
    }

    @Put(':id')
    updateUser(@Param('id') id: string, @Body() userData: UpdateUserDto): Promise<User> {
        return this.userService.updateUser(id, userData);
    }

    @Delete(':id')
    removeUser(@Param('id') id: string): Promise<void> {
        return this.userService.removeUser(id);
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    getAllUsers(): Promise<User[]> {
        return this.userService.getAllUsers();
    }

    @Get(':email')
    getUserOne(@Param('email') email: string): Promise<User> {
        return this.userService.getUserOne(email);
    }
}
