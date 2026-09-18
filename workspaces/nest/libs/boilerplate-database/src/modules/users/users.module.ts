import { Module } from '@nestjs/common';

// modules
import { TypeOrmModule } from '@nestjs/typeorm';

// entities
import { User } from './entities/user.entity.js';
import { UserResetPassword } from './entities/user-reset-password.entity.js';

// subscribers
import { UsersSubscriber } from './users.subscriber.js';
import { UsersResetPasswordSubscriber } from './users-reset-password.subscriber.js';

@Module({
  imports: [
    // modules
    TypeOrmModule.forFeature([User, UserResetPassword])
  ],
  providers: [
    // subscribers
    UsersSubscriber,
    UsersResetPasswordSubscriber
  ]
})
export class UsersModule {}
