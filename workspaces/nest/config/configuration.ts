import { Administrator } from '../libs/boilerplate-database/src/modules/administrators/entities/administrator.entity.js';
import { AdministratorResetPassword } from '../libs/boilerplate-database/src/modules/administrators/entities/administrator-reset-password.entity.js';
import { User } from '../libs/boilerplate-database/src/modules/users/entities/user.entity.js';
import { UserResetPassword } from '../libs/boilerplate-database/src/modules/users/entities/user-reset-password.entity.js';

export const configuration = () => ({
  port: process.env.APP_PORT ? +process.env.APP_PORT : undefined,
  database: {
    type: 'mysql',
    host: process.env.APP_DATABASE_HOST,
    port: 3306,
    username: process.env.APP_DATABASE_USERNAME,
    password: process.env.APP_DATABASE_PASSWORD,
    database: process.env.APP_DATABASE_DATABASE,
    entities: [Administrator, AdministratorResetPassword, User, UserResetPassword],
    synchronize: process.env.APP_DATABASE_SYNCHRONIZE,
    logging: ['error']
  }
});
