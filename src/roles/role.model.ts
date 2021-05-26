import {Column, Model, Table, DataType, HasMany} from 'sequelize-typescript';
import {User} from '../users/user.model';

@Table
export class Role extends Model {
    @Column({type: DataType.TINYINT.UNSIGNED, primaryKey: true, autoIncrement: true})
    id: number;

    @Column({type: DataType.STRING, allowNull: false, unique: true})
    value: string;

    @Column({type: DataType.STRING, allowNull: false})
    description: string;

    // Связь с таблицей пользователей
    @HasMany(() => User)
    users: User[];
}