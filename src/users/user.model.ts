import {Column, Model, Table, DataType, BelongsTo, ForeignKey, HasMany} from 'sequelize-typescript';
import {Role} from '../roles/role.model';
import {Post} from '../posts/post.model';

@Table
export class User extends Model {
    @Column({type: DataType.TINYINT.UNSIGNED, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.STRING, unique: true, allowNull: false})
    email: string;

    @Column({type: DataType.STRING, allowNull: false})
    password: string;

    @Column({type: DataType.BOOLEAN, defaultValue: false})
    banned: boolean;

    @Column({type: DataType.STRING, allowNull: true})
    banReason: string;

    // Связь с таблицей ролей
    @ForeignKey(() => Role)
    @Column({type: DataType.TINYINT.UNSIGNED})
    roleId: number;

    @BelongsTo(() => Role)
    role: Role;

    // Связь с таблицей записей
    @HasMany(() => Post)
    posts: Post[];
}