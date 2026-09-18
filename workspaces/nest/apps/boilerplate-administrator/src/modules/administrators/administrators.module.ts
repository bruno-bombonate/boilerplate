import { Module } from '@nestjs/common';

// modules
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

// entities
import { Administrator } from '@app/boilerplate-database/modules/administrators/entities/administrator.entity.js';
import { AdministratorResetPassword } from '@app/boilerplate-database/modules/administrators/entities/administrator-reset-password.entity.js';

// controllers
import { AdministratorsController } from './administrators.controller.js';

// services
import { AdministratorsService } from './administrators.service.js';
import { AdministratorsResetPasswordService } from './administrators-reset-password.service.js';
import { BoilerplateEmailService } from '@app/boilerplate-email';

// strategies
import { JwtStrategy } from '../../utils/strategies/jwt/jwt.strategy.js';

@Module({
  imports: [
    // modules
    TypeOrmModule.forFeature([Administrator, AdministratorResetPassword]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      useFactory: async () => {
        return {
          secret: process.env.APP_BOILERPLATE_ADMINISTRATOR_API_SECRET_KEY,
          signOptions: {
            expiresIn: +process.env.APP_BOILERPLATE_ADMINISTRATOR_API_EXPIRES_IN!
          }
        };
      }
    })
  ],
  controllers: [
    // controllers
    AdministratorsController
  ],
  providers: [
    // services
    AdministratorsService,
    AdministratorsResetPasswordService,
    BoilerplateEmailService,
    // strategies
    JwtStrategy
  ]
})
export class AdministratorsModule {}
