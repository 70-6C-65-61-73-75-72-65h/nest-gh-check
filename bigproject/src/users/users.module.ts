import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { DatabaseModule } from 'src/database/database.module';
import UserModel from '../database/models/user.model';
import { AuthenticationModule } from 'src/authentication/authentication.module';
import { TwoFactorAuthModule } from 'src/two-factor-auth/two-factor-auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    DatabaseModule,
    ConfigModule,
    forwardRef(() => AuthenticationModule),
    forwardRef(() => TwoFactorAuthModule),
  ],
  providers: [
    UsersService,
    {
      provide: 'USER_MODEL',
      useValue: UserModel,
    },
  ],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
