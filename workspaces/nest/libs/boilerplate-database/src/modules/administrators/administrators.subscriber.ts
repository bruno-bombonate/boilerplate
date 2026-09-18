import { EventSubscriber, EntitySubscriberInterface, DataSource, InsertEvent, UpdateEvent } from 'typeorm';
import { Administrator } from './entities/administrator.entity.js';
import { hash } from 'bcryptjs';

@EventSubscriber()
export class AdministratorsSubscriber implements EntitySubscriberInterface<Administrator> {

  constructor(
    private readonly dateSource: DataSource
  ) {
    this.dateSource.subscribers.push(this);
  }

  public listenTo(): typeof Administrator {
    return Administrator;
  }

  public async beforeInsert(insertEvent: InsertEvent<Administrator>): Promise<void> {
    insertEvent.entity.password = await hash(insertEvent.entity.password, 10);
    insertEvent.entity.createdAt = Date.now();
  }

  public async beforeUpdate(updateEvent: UpdateEvent<Administrator>): Promise<void> {
    if (updateEvent.entity?.password) {
      updateEvent.entity.password = await hash(updateEvent.entity.password, 10);
    }
  }

}
