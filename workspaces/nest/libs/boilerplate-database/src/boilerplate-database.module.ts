import { Module } from '@nestjs/common';

// modules
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdministratorsModule } from './modules/administrators/administrators.module.js';
import { UsersModule } from './modules/users/users.module.js';

// services
import { ConfigService } from '@nestjs/config';

// others
import { configuration } from '../../../config/configuration.js';

@Module({
  imports: [
    // modules
    ConfigModule.forRoot({
      load: [configuration]
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => (configService.getOrThrow('database')),
      inject: [ConfigService]
    }),
    AdministratorsModule,
    UsersModule
  ]
})
export class BoilerplateDatabaseModule {}
