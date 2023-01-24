import { User } from './../users/users.model';

import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';

interface PostCreationAttrs {
  title: string;
  content: string;
  userId: number;
  img?: string;
}

@Table({ tableName: 'posts' })
export class Post extends Model<Post, PostCreationAttrs> {
  @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'title', description: 'Название поста' })
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  title: string;

  @ApiProperty({ example: '', description: 'Контент' })
  @Column({
    type: DataType.STRING,
  })
  content: string;

  @ApiProperty({ example: '', description: 'Ссылка на изображение' })
  @Column({
    type: DataType.STRING,
  })
  img?: string;

  @ApiProperty({ example: '1', description: 'id автора' })
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
  })
  userId: number;

  @BelongsTo(() => User)
  author: User;
}
