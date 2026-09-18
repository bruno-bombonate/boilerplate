import { EventSubscriber, EntitySubscriberInterface, DataSource, InsertEvent } from 'typeorm';
import { UserResetPassword } from './entities/user-reset-password.entity.js';
import { randomBytes } from 'crypto';

@EventSubscriber()
export class UsersResetPasswordSubscriber implements EntitySubscriberInterface<UserResetPassword> {

  constructor(
    private readonly dateSource: DataSource
  ) {
    this.dateSource.subscribers.push(this);
  }

  public listenTo(): typeof UserResetPassword {
    return UserResetPassword;
  }

  public async beforeInsert(insertEvent: InsertEvent<UserResetPassword>): Promise<void> {
    insertEvent.entity.token = randomBytes(64).toString('hex');
    insertEvent.entity.createdAt = Date.now();
  }

}
