import { Module } from '@nestjs/common';

// modules
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';

// entities
import { User } from '@app/boilerplate-database/modules/users/entities/user.entity.js';

// controllers
import { UsersController } from './users.controller.js';

// services
import { UsersService } from './users.service.js';

@Module({
  imports: [
    // modules
    TypeOrmModule.forFeature([User]),
    PassportModule.register({ defaultStrategy: 'jwt' })
  ],
  controllers: [
    // controllers
    UsersController
  ],
  providers: [
    // services
    UsersService
  ]
})
export class UsersModule {}
