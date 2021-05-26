import {Body, Controller, Get, Param, Post, Put} from '@nestjs/common';
import {RolesService} from './roles.service';
import {Role} from './role.model';
import {CreateRoleDto} from './dto/create-role.dto';
import {UpdateRoleDto} from './dto/update-role.dto';

@Controller('roles')
export class RolesController {
    constructor(private readonly roleService: RolesService) {
    }

    @Post()
    createRole(@Body() roleDto: CreateRoleDto): Promise<Role> {
        return this.roleService.createRole(roleDto);
    }

    @Put(':id')
    updateRole(@Param('id') id: string, @Body() roleDto: UpdateRoleDto): Promise<Role> {
        return this.roleService.updateRole(id, roleDto);
    }

    @Get()
    getAllRoles(): Promise<Role[]> {
        return this.roleService.getAllRoles();
    }

    @Get(':value')
    getOneRole(@Param('value') value: string): Promise<Role> {
        return this.roleService.getOneRole(value);
    }
}
