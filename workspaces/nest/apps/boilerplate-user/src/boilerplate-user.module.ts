import { Module } from '@nestjs/common';

// modules
import { BoilerplateDatabaseModule } from '@app/boilerplate-database';
import { BoilerplateEmailModule } from '@app/boilerplate-email';
import { UsersModule } from './modules/users/users.module.js';

@Module({
  imports: [
    // modules
    BoilerplateDatabaseModule,
    BoilerplateEmailModule,
    UsersModule
  ]
})
export class BoilerplateUserModule {}
