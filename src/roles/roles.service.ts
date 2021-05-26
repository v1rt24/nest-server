import {HttpException, Injectable, NotFoundException} from '@nestjs/common';
import {InjectModel} from '@nestjs/sequelize';
import {Role} from './role.model';
import {CreateRoleDto} from './dto/create-role.dto';
import {UpdateRoleDto} from './dto/update-role.dto';

@Injectable()
export class RolesService {
    constructor(
        @InjectModel(Role)
        private roleModel: typeof Role,
    ) {
    }

    async createRole(roleDto: CreateRoleDto): Promise<Role> {
        try {
            return await this.roleModel.create(roleDto);
        } catch (error) {
            if (error.original.errno === 1062) {
                throw new HttpException(`Роль '${roleDto.value}' уже существует`, 400);
            }
        }
    }

    async updateRole(id: string, roleDto: UpdateRoleDto): Promise<Role> {
        try {
            const role = await this.roleModel.findByPk(id);

            if (!role) {
                throw new Error();
            }

            return await role.update(roleDto);
        } catch (error) {
            console.log(error);
        }
    }

    async getAllRoles(): Promise<Role[]> {
        try {
            return await this.roleModel.findAll();
        } catch (error) {
            console.log(error);
        }
    }

    async getOneRole(value: string): Promise<Role> {
        try {
            const role = await this.roleModel.findOne({where: {value}});

            if (!role) {
                throw new Error();
            }

            return role;
        } catch (error) {
            throw new NotFoundException(`Роль '${value}' не найдена`);
        }
    }
}
