import { EventSubscriber, EntitySubscriberInterface, DataSource, InsertEvent } from 'typeorm';
import { AdministratorResetPassword } from './entities/administrator-reset-password.entity.js';
import { randomBytes } from 'crypto';

@EventSubscriber()
export class AdministratorsResetPasswordSubscriber implements EntitySubscriberInterface<AdministratorResetPassword> {

  constructor(
    private readonly dateSource: DataSource
  ) {
    this.dateSource.subscribers.push(this);
  }

  public listenTo(): typeof AdministratorResetPassword {
    return AdministratorResetPassword;
  }

  public async beforeInsert(insertEvent: InsertEvent<AdministratorResetPassword>): Promise<void> {
    insertEvent.entity.token = randomBytes(64).toString('hex');
    insertEvent.entity.createdAt = Date.now();
  }

}
