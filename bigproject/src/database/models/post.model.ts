import { ApiProperty } from '@nestjs/swagger';
import { Table, Model, Column, DataType } from 'sequelize-typescript';
import { PostCreationAttrs } from '../../posts/types';

@Table({ tableName: 'posts' })
export default class PostModel extends Model<PostModel, PostCreationAttrs> {
  @ApiProperty({ example: '1', description: 'unique id', required: false })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'uset@gmail.com', description: 'unique post title' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  title: string;

  @ApiProperty({ example: '132323', description: 'post content' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  content: string;
}
