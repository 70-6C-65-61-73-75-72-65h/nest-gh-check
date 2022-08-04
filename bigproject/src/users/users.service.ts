import { ConfigService } from '@nestjs/config';
import UserModel from '../database/models/user.model';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './types';
import { NetworkErrors } from 'src/constants';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USER_MODEL')
    private readonly userRepository: typeof UserModel,
    private readonly configService: ConfigService,
  ) {}

  async setCurrentRefreshToken(refreshToken: string, userId: number) {
    const currentHashedRefreshToken = await bcrypt.hash(
      refreshToken,
      +this.configService.get('USER_PASSWORD_SALT_ROUNDS'),
    );
    await this.userRepository.update(
      {
        currentHashedRefreshToken,
      },
      { where: { id: userId } },
    );
  }

  async checkIfUserWitHSuchEmailExists(
    userDTO: CreateUserDto,
    updateProps?: { isUpdate: boolean; userId: number },
  ) {
    const isUpdate = updateProps?.isUpdate;
    const userId = updateProps?.userId;
    const candidate = await this.getUserByEmail(userDTO.email);

    if (candidate && !isUpdate) {
      throw new HttpException(
        NetworkErrors.ACCOUNT_EXISTS,
        HttpStatus.BAD_REQUEST,
      );
    }
    if ((!candidate || candidate.get('id') !== userId) && isUpdate) {
      throw new HttpException(
        NetworkErrors.ACCOUNT_DOES_NOT_EXISTS,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async turnOnTwoFactorAuthentication(userId: number) {
    return this.userRepository.update(
      { isTwoFactorAuthenticationEnabled: true },
      {
        where: { id: userId },
      },
    );
  }

  async setTwoFactorAuthenticationSecret(secret: string, userId: number) {
    return this.userRepository.update(
      { twoFactorAuthenticationSecret: secret },
      {
        where: { id: userId },
      },
    );
  }

  // if admin can create the user // 2fa +
  async createUser(dto: CreateUserDto) {
    await this.checkIfUserWitHSuchEmailExists(dto);
    const user = await this.userRepository.create(dto);
    return user.get({ plain: true });
  }

  async updateUser(dto: CreateUserDto, id: number) {
    dto.email &&
      (await this.checkIfUserWitHSuchEmailExists(dto, {
        isUpdate: true,
        userId: id,
      }));
    await this.userRepository.update(dto, { where: { id } });
    const updatedUser = await this.userRepository.findByPk(id);

    return updatedUser.get({ plain: true });
  }

  async getAllUsers() {
    return await this.userRepository.findAll({ include: { all: true } });
  }
  async getUserByEmail(email: string) {
    return await this.userRepository.findOne({
      where: { email },
      include: { all: true },
    });
  }
  async getUserById(id: number) {
    const user = await this.userRepository.findByPk(id);
    if (user) {
      return user;
    }
    throw new HttpException(
      'User with this id does not exist',
      HttpStatus.NOT_FOUND,
    );
  }

  async getUserIfRefreshTokenMatch(refreshToken: string, userId: number) {
    const user = await this.getUserById(userId);

    const isRefreshTokenMatch = await bcrypt.compare(
      refreshToken,
      user.currentHashedRefreshToken,
    );
    if (isRefreshTokenMatch) return user;
  }
}
