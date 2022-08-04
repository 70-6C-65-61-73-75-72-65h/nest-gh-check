import { ConfigModule, ConfigService } from '@nestjs/config';
import { Sequelize } from 'sequelize-typescript';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    inject: [ConfigService],
    imports: [ConfigModule],
    configService: ConfigService,
    useFactory: async (configService: ConfigService) => {
      const sequelize = new Sequelize({
        dialect: configService.get('POSTGRES_DIALECT'),
        host: configService.get('POSTGRES_HOST'),
        port: configService.get('POSTGRES_PORT'),
        username: configService.get('POSTGRES_USER'),
        password: configService.get('POSTGRES_PASSWORD'),
        database: configService.get('POSTGRES_DB'),
      });
      sequelize.addModels([`${__dirname}/../**/*.model{.ts,.js}`]);
      await sequelize.sync();
      return sequelize;
    },
  },
];

// host: configService.get('POSTGRES_HOST'),
// port: configService.get('POSTGRES_PORT'),
// username: configService.get('POSTGRES_USER'),
// password: configService.get('POSTGRES_PASSWORD'),
// database: configService.get('POSTGRES_DB'),
