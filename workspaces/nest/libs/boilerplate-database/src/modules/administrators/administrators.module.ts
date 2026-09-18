import { Module } from '@nestjs/common';

// modules
import { TypeOrmModule } from '@nestjs/typeorm';

// entities
import { Administrator } from './entities/administrator.entity.js';
import { AdministratorResetPassword } from './entities/administrator-reset-password.entity.js';

// subscribers
import { AdministratorsSubscriber } from './administrators.subscriber.js';
import { AdministratorsResetPasswordSubscriber } from './administrators-reset-password.subscriber.js';

@Module({
  imports: [
    // modules
    TypeOrmModule.forFeature([Administrator, AdministratorResetPassword])
  ],
  providers: [
    // subscribers
    AdministratorsSubscriber,
    AdministratorsResetPasswordSubscriber
  ]
})
export class AdministratorsModule {}
