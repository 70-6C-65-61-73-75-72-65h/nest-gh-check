import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './types';
import UserModel from '../database/models/user.model';
import { UsersService } from './users.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'User Creation' })
  @ApiResponse({ status: 201, type: UserModel })
  @Post()
  create(@Body() userDTO: CreateUserDto) {
    return this.usersService.createUser(userDTO);
  }
  @ApiOperation({ summary: 'User Updation' })
  @ApiResponse({ status: 200, type: UserModel })
  @Put('/:id')
  update(@Body() userDTO: CreateUserDto, @Param('id') id: string) {
    return this.usersService.updateUser(userDTO, +id);
  }

  @ApiOperation({ summary: 'User Retrieving by id' })
  @ApiResponse({ status: 200, type: UserModel })
  @Get('/:id')
  getOneById(@Param('id') id: string) {
    return this.usersService.getUserById(+id);
  }

  @ApiOperation({ summary: 'All Users Retrieving' })
  @ApiResponse({ status: 200, type: [UserModel] })
  @Get()
  getAll() {
    return this.usersService.getAllUsers();
  }
}
