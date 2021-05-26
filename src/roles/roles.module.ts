import {Module} from '@nestjs/common';
import {SequelizeModule} from '@nestjs/sequelize';
import {Role} from './role.model';
import {RolesController} from './roles.controller';
import {RolesService} from './roles.service';

@Module({
    exports: [RolesService],
    imports: [SequelizeModule.forFeature([Role])],
    controllers: [RolesController],
    providers: [RolesService],
})
export class RolesModule {
}
