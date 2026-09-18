import { EventSubscriber, EntitySubscriberInterface, DataSource, InsertEvent, UpdateEvent } from 'typeorm';
import { User } from './entities/user.entity.js';
import { hash } from 'bcryptjs';

@EventSubscriber()
export class UsersSubscriber implements EntitySubscriberInterface<User> {

  constructor(
    private readonly dateSource: DataSource
  ) {
    this.dateSource.subscribers.push(this);
  }

  public listenTo(): typeof User {
    return User;
  }

  public async beforeInsert(insertEvent: InsertEvent<User>): Promise<void> {
    insertEvent.entity.password = await hash(insertEvent.entity.password, 10);
    insertEvent.entity.status = true;
    insertEvent.entity.createdAt = Date.now();
  }

  public async beforeUpdate(updateEvent: UpdateEvent<User>): Promise<void> {
    if (updateEvent.entity?.password) {
      updateEvent.entity.password = await hash(updateEvent.entity.password, 10);
    }
  }

}
