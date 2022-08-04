import { TwoFactorAuthService } from './two-factor-auth.service';
import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import JwtAuthenticationGuard from 'src/authentication/guards/jwt-auth.guard';
import { Response } from 'express';
import { RequestWithUser } from 'src/authentication/types';
import { TwoFactorAuthenticationCodeDto } from './2fa.dto';
import { UsersService } from 'src/users/users.service';
import { AuthenticationService } from 'src/authentication/authentication.service';

@Controller('two-factor-auth')
@UseInterceptors(ClassSerializerInterceptor)
export class TwoFactorAuthController {
  constructor(
    private readonly twoFactorAuthService: TwoFactorAuthService,
    private readonly usersService: UsersService,
    private readonly authenticationService: AuthenticationService,
  ) {}

  @Post('authenticate')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthenticationGuard)
  async authenticate(
    @Req() request: RequestWithUser,
    @Body() { twoFactorAuthenticationCode }: TwoFactorAuthenticationCodeDto,
  ) {
    const isCodeValid = this.twoFactorAuthService.isTwoFactorAuthCodeValid(
      twoFactorAuthenticationCode,
      request.user,
    );
    if (!isCodeValid) {
      throw new UnauthorizedException('Wrong auth code');
    }
    const accessTokenCookie =
      this.authenticationService.getCookieWithJwtAccessToken(
        request.user.id,
        true,
      );
    request.res.setHeader('Set-Cookie', [accessTokenCookie]);
  }

  @Post('turn-on')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthenticationGuard)
  async turnOnTwoFactorAuth(
    @Req() request: RequestWithUser,
    @Body() { twoFactorAuthenticationCode }: TwoFactorAuthenticationCodeDto,
  ) {
    const isCodeValid = this.twoFactorAuthService.isTwoFactorAuthCodeValid(
      twoFactorAuthenticationCode,
      request.user,
    );
    if (!isCodeValid) {
      throw new UnauthorizedException('Wrong auth code');
    } else {
      await this.usersService.turnOnTwoFactorAuthentication(request.user.id);
    }
  }

  @Post('generate')
  @UseGuards(JwtAuthenticationGuard)
  async register(@Res() response: Response, @Req() request: RequestWithUser) {
    const { otpauthUrl } =
      await this.twoFactorAuthService.generateTwoFactorAuthSecret(request.user);
    console.log('otpauthUrl');
    console.log(otpauthUrl);
    response.setHeader('content-type', 'image/png');
    return this.twoFactorAuthService.pipeQrCodeStream(response, otpauthUrl);
  }
}
