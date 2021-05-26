import {Column, Model, Table, DataType, ForeignKey, BelongsTo} from 'sequelize-typescript';
import {User} from '../users/user.model';

@Table
export class Post extends Model {
    @Column({type: DataType.TINYINT.UNSIGNED, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.STRING, allowNull: false, unique: true})
    title: string;

    @Column({type: DataType.TEXT, allowNull: false})
    content: string;

    @Column({type: DataType.STRING})
    image: string;

    // Связь с таблицей пользователей
    @ForeignKey(() => User)
    @Column({type: DataType.TINYINT.UNSIGNED})
    userId: number;

    @BelongsTo(() => User)
    author: User;
}