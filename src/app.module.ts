import {Module} from '@nestjs/common';
import {ConfigModule} from '@nestjs/config'; // для использования файла .env
import {SequelizeModule} from '@nestjs/sequelize';
import {UsersModule} from './users/users.module';
import {RolesModule} from './roles/roles.module';
import {User} from './users/user.model';
import {Role} from './roles/role.model';
import {Post} from './posts/post.model';
import {AuthModule} from './auth/auth.module';
import {PostsModule} from './posts/posts.module';

@Module({
    imports: [
        ConfigModule.forRoot(),
        SequelizeModule.forRoot({
            dialect: 'mysql',
            host: process.env.DB_HOST,
            port: +process.env.DB_PORT,
            username: process.env.DB_USER_NAME,
            password: process.env.DB_USER_PASSWORD,
            database: process.env.DB_DATA_BASE,
            autoLoadModels: true,
            models: [User, Role, Post],
        }),
        UsersModule,
        RolesModule,
        AuthModule,
        PostsModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {
}
