import { Module } from '@nestjs/common';

// modules
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

// entities
import { User } from '@app/boilerplate-database/modules/users/entities/user.entity.js';
import { UserResetPassword } from '@app/boilerplate-database/modules/users/entities/user-reset-password.entity.js';

// controllers
import { UsersController } from './users.controller.js';

// services
import { UsersService } from './users.service.js';
import { UsersResetPasswordService } from './users-reset-password.service.js';
import { BoilerplateEmailService } from '@app/boilerplate-email';

// strategies
import { JwtStrategy } from '../../utils/strategies/jwt/jwt.strategy.js';

@Module({
  imports: [
    // modules
    TypeOrmModule.forFeature([User, UserResetPassword]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      useFactory: async () => {
        return {
          secret: process.env.APP_BOILERPLATE_USER_API_SECRET_KEY,
          signOptions: {
            expiresIn: +process.env.APP_BOILERPLATE_USER_API_EXPIRES_IN!
          }
        };
      }
    })
  ],
  controllers: [
    // controllers
    UsersController
  ],
  providers: [
    // services
    UsersService,
    UsersResetPasswordService,
    BoilerplateEmailService,
    // strategies
    JwtStrategy
  ]
})
export class UsersModule {}
