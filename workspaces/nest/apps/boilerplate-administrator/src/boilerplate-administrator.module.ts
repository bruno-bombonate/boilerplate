import { Module } from '@nestjs/common';

// modules
import { BoilerplateDatabaseModule } from '@app/boilerplate-database';
import { BoilerplateEmailModule } from '@app/boilerplate-email';
import { AdministratorsModule } from './modules/administrators/administrators.module.js';
import { UsersModule } from './modules/users/users.module.js';

@Module({
  imports: [
    // modules
    BoilerplateDatabaseModule,
    BoilerplateEmailModule,
    AdministratorsModule,
    UsersModule
  ]
})
export class BoilerplateAdministratorModule {}
