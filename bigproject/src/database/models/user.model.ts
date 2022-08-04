import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { Table, Model, Column, DataType } from 'sequelize-typescript';
import { UserCreationAttrs } from '../../users/types';

@Table({ tableName: 'users' })
export default class UserModel extends Model<UserModel, UserCreationAttrs> {
  @ApiProperty({ example: '1', description: 'unique id', required: false })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Exclude()
  @ApiProperty({
    example: 'sgsdgsdgsdg',
    description: 'current Hashed Refresh Token',
    required: false,
  })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  currentHashedRefreshToken?: string;

  @ApiProperty({
    example: 'sgsdgsdgsdg',
    description: 'two Factor Authentication Secret',
    required: false,
  })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  twoFactorAuthenticationSecret?: string;

  @ApiProperty({
    example: 'sgsdgsdgsdg',
    description: 'two Factor Authentication Secret',
    required: false,
  })
  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  isTwoFactorAuthenticationEnabled: boolean;

  @ApiProperty({ example: 'uset@gmail.com', description: 'unique email' })
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  email: string;

  @ApiProperty({ example: '132323', description: 'user password' })
  @Exclude()
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @ApiProperty({ example: 'Alfred', description: 'user name' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;
}
