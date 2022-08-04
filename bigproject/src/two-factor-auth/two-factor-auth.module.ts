import { JwtTwoFactorStrategy } from './../authentication/strategies/jwt-2fa.strategy';
import { AuthenticationModule } from './../authentication/authentication.module';
import { forwardRef, Module } from '@nestjs/common';
import { TwoFactorAuthService } from './two-factor-auth.service';
import { TwoFactorAuthController } from './two-factor-auth.controller';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    ConfigModule,
    forwardRef(() => AuthenticationModule),
    forwardRef(() => UsersModule),
  ],
  providers: [TwoFactorAuthService, JwtTwoFactorStrategy],
  controllers: [TwoFactorAuthController],
  exports: [TwoFactorAuthService],
})
export class TwoFactorAuthModule {}
