import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from '@hapi/joi';
import { AuthenticationModule } from './authentication/authentication.module';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { PostsService } from './posts/posts.service';
import { PostsModule } from './posts/posts.module';
import { UsersService } from './users/users.service';
import { TwoFactorAuthModule } from './two-factor-auth/two-factor-auth.module';
import PostModel from './database/models/post.model';
import UserModel from './database/models/user.model';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        POSTGRES_DIALECT: Joi.string().required(),
        POSTGRES_HOST: Joi.string().required(),
        POSTGRES_PORT: Joi.number().required(),
        POSTGRES_USER: Joi.string().required(),
        POSTGRES_PASSWORD: Joi.string().required(),
        POSTGRES_DB: Joi.string().required(),
        PORT: Joi.number(),
        USER_PASSWORD_SALT_ROUNDS: Joi.string().required(),
        JWT_SECRET: Joi.string().required(),
        JWT_EXPIRATION_TIME: Joi.string().required(),

        JWT_ACCESS_TOKEN_SECRET: Joi.string().required(),
        JWT_ACCESS_TOKEN_EXPIRATION_TIME: Joi.string().required(),
        JWT_REFRESH_TOKEN_SECRET: Joi.string().required(),
        JWT_REFRESH_TOKEN_EXPIRATION_TIME: Joi.string().required(),
      }),
    }),
    DatabaseModule,
    UsersModule,
    PostsModule,
    TwoFactorAuthModule,
    AuthenticationModule,
  ],
  controllers: [],
  providers: [
    PostsService,
    UsersService,
    ConfigService,
    {
      provide: 'POST_MODEL',
      useValue: PostModel,
    },
    {
      provide: 'USER_MODEL',
      useValue: UserModel,
    },
  ],
})
export class AppModule {}
