import {forwardRef, Module} from '@nestjs/common';
import {SequelizeModule} from '@nestjs/sequelize';
import {User} from './user.model';
import {UsersController} from './users.controller';
import {UsersService} from './users.service';

import {RolesModule} from '../roles/roles.module';
import {AuthModule} from '../auth/auth.module';

@Module({
    exports: [UsersService],
    imports: [
        SequelizeModule.forFeature([User]),
        RolesModule,
        forwardRef(() => AuthModule),
    ],
    controllers: [UsersController],
    providers: [UsersService],
})
export class UsersModule {
}
