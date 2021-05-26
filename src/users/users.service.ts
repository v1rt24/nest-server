import {HttpException, Injectable, NotFoundException} from '@nestjs/common';
import {InjectModel} from '@nestjs/sequelize';
import {User} from './user.model';
import {Role} from '../roles/role.model';
import {RolesService} from '../roles/roles.service';
import {CreateUserDto} from './dto/create-user.dto';
import {UpdateUserDto} from './dto/update-user.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User)
        private userModel: typeof User,
        private readonly roleService: RolesService,
    ) {
    }

    // Создание пользователя
    async createUser(userDto: CreateUserDto): Promise<User> {
        try {
            const user = await this.userModel.create(userDto);
            const role = await this.roleService.getOneRole('user');
            await user.$set('role', [role.id]);
            user.role = role;
            return user;
        } catch (error) {
            if (error.original.errno === 1062) {
                throw new HttpException(`Пользователь с почтой ${userDto.email} уже существует`, 400);
            }
        }
    }

    // Обновление записи пользователя
    async updateUser(id: string, dataUser: UpdateUserDto): Promise<User> {
        try {
            const user = await this.userModel.findOne({where: {id}});

            if (!user) {
                throw new Error();
            }

            return await user.update(dataUser);
        } catch (error) {
            throw new HttpException(`Пользовател с id ${id} не найден`, 400);
        }
    }

    // Удаление пользователя
    async removeUser(id: string): Promise<void> {
        try {
            const user = await this.userModel.findOne({where: {id}});

            if (!user) {
                throw new Error();
            }

            await user.destroy();
        } catch (error) {
            throw new HttpException(`Пользовател с id ${id} не найден`, 400);
        }
    }

    // Выборка всех пользователей
    async getAllUsers(): Promise<User[]> {
        try {
            return await this.userModel.findAll({include: {all: true}});
        } catch (error) {
            console.log(error);
        }
    }

    // Выборка определённого пользователя по почте
    async getUserOne(email: string): Promise<User> {
        try {
            const user = await this.userModel.findOne({where: {email}, include: {all: true}});

            if (!user) {
                throw new Error();
            }

            return user;
        } catch (error) {
            throw new NotFoundException(`Пользователь с почтой ${email} не найден`);
        }
    }

    // Выборка для регистрации пользователя
    async getUserEmail(email: string) {
        return await this.userModel.findOne({where: {email}, include: {all: true}});
    }
}
