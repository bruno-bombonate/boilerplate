import { Module } from '@nestjs/common';

// modules
import { MailerModule } from '@nestjs-modules/mailer';

// services
import { BoilerplateEmailService } from './boilerplate-email.service.js';

// others
import { join } from 'path';
import { EjsAdapter } from '@nestjs-modules/mailer/adapters/ejs.adapter';

@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: () => ({
        transport: {
          host: process.env.APP_SMTP_HOST,
          secure: true,
          auth: {
            user: process.env.APP_SMTP_USERNAME,
            pass: process.env.APP_SMTP_PASSWORD
          }
        },
        template: {
          dir: join(process.cwd(), 'libs', 'boilerplate-email', 'src', 'templates'),
          adapter: new EjsAdapter(),
          options: {
            strict: true
          }
        }
      })
    })
  ],
  providers: [
    // services
    BoilerplateEmailService
  ],
  exports: [
    // services
    BoilerplateEmailService
  ]
})
export class BoilerplateEmailModule {}
