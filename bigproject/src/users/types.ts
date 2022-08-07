import { IsString, Length, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'eee@gmail.com', description: 'unique email' })
  @IsString({ message: 'should be string type' })
  @IsEmail({}, { message: 'Email is invalid' })
  email: string;
  @ApiProperty({ example: 'Alfred', description: 'user name' })
  @IsString({ message: 'should be string type' })
  @Length(0, 40, { message: 'Should be less than 40 and more than 0' })
  name: string;
  @ApiProperty({ example: '132323', description: 'user password' })
  @IsString({ message: 'should be string type' })
  @Length(3, 16, { message: 'Should be less than 16 and more than 3' })
  password: string;
}

export interface UserCreationAttrs {
  email: string;
  name: string;
  password: string;
}
