import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length, MaxLength } from 'class-validator';

export class EditPostDto {
  @ApiProperty({ example: 'Content here', description: 'post content' })
  @IsString({ message: 'should be string type' })
  @MaxLength(300, { message: 'Should be less than 300  ' })
  content: string;
  @ApiProperty({ example: 'Content making', description: 'post title' })
  @IsString({ message: 'should be string type' })
  @MaxLength(40, { message: 'Should be less than 40  ' })
  title: string;
}
export interface PostCreationAttrs {
  title: string;
  content: string;
}
