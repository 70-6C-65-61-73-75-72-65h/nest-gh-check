import { ConfigService } from '@nestjs/config';
import { UsersService } from 'src/users/users.service';
import { Injectable } from '@nestjs/common';
import UserModel from 'src/database/models/user.model';
import { authenticator } from '@otplib/preset-default';
import { Response } from 'express';
import { toFileStream } from 'qrcode';

@Injectable()
export class TwoFactorAuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly configService: ConfigService,
  ) {}

  public isTwoFactorAuthCodeValid(
    twoFactorAuthenticationCode: string,
    user: UserModel,
  ) {
    return authenticator.verify({
      token: twoFactorAuthenticationCode,
      secret: user.twoFactorAuthenticationSecret,
    });
  }

  public async generateTwoFactorAuthSecret(user: UserModel) {
    const secret = authenticator.generateSecret();
    const otpauthUrl = authenticator.keyuri(
      user.email,
      this.configService.get('TWO_FACTOR_AUTHENTICATION_APP_NAME'),
      secret,
    );
    console.log('otpauthUrl');
    console.log(otpauthUrl);
    console.log('secret');
    console.log(secret);

    await this.usersService.setTwoFactorAuthenticationSecret(secret, user.id);

    return { secret, otpauthUrl };
  }

  public async pipeQrCodeStream(stream: Response, otpauthUrl: string) {
    return toFileStream(stream, otpauthUrl);
  }
}
