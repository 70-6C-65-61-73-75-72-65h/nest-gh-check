import { AuthenticationService } from './authentication.service';
import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CredsDTO, RequestWithUser } from './types';
import { LocalAuthenticationGuard } from './guards/local-auth.guard';
import { Response } from 'express';
import JwtAuthenticationGuard from './guards/jwt-auth.guard';
import { UsersService } from 'src/users/users.service';

@Controller('authentication')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthenticationController {
  constructor(
    private readonly authenticationService: AuthenticationService,
    private readonly usersService: UsersService,
  ) {}

  @Post('register')
  async register(@Body() creds: CredsDTO) {
    return this.authenticationService.register(creds);
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthenticationGuard)
  @Post('login')
  async logIn(@Req() request: RequestWithUser, @Res() response: Response) {
    const { user } = request;
    console.log('user');
    console.log(user);

    const accessTokenCookie =
      this.authenticationService.getCookieWithJwtAccessToken(user.id);
    const { cookie: refreshTokenCookie, token } =
      this.authenticationService.getCookieWithJwtRefreshToken(user.id);
    await this.usersService.setCurrentRefreshToken(token, user.id);
    response.setHeader('Set-Cookie', [accessTokenCookie, refreshTokenCookie]);
    user.password = undefined;

    if (user.isTwoFactorAuthenticationEnabled) {
      // we dont need to provide user data if we actually already auth-ed
      return response.sendStatus(HttpStatus.OK);
    }

    return response.send(user);
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthenticationGuard)
  @Post('logout')
  async logOut(@Req() request: RequestWithUser, @Res() response: Response) {
    response.setHeader(
      'Set-Cookie',
      this.authenticationService.getCookiesForLogOut(),
    );
    // return response.end();
    return response.sendStatus(HttpStatus.OK);
  }

  @UseGuards(JwtAuthenticationGuard)
  @Get()
  authnticate(@Req() request: RequestWithUser) {
    const user = request.user;
    user.password = undefined;
    return user;
  }
}
