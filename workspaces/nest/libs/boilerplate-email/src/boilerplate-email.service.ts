import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class BoilerplateEmailService {

  constructor(
    private readonly mailerService: MailerService
  ) { }

  public sendResetPasswordEmail(email: string, name: string, url: string): void {
    void this.mailerService
      .sendMail({
        to: email,
        from: {
          name: 'Boilerplate',
          address: process.env.APP_SMTP_USERNAME!
        },
        subject: 'Reset password',
        template: 'reset-password',
        context: { name, url }
      });
  }

}
