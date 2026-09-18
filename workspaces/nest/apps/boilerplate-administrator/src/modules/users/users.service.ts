import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@app/boilerplate-database/modules/users/entities/user.entity.js';
import { Repository, SelectQueryBuilder } from 'typeorm';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>
  ) { }

  private userQuery(options?: { where?: any, orderBy?: any, offset?: null | number, limit?: null | number }): SelectQueryBuilder<any> {

    const query = this.repository
      .createQueryBuilder('user');

    if (options?.where?.userId) {
      query.andWhere('user.id = :userId', { userId: options.where.userId });
    }
    if (options?.where?.userName) {
      query.andWhere('user.name LIKE :userName', { userName: `%${options.where.userName}%` });
    }
    if (options?.where?.userEmail) {
      query.andWhere('user.email LIKE :userEmail', { userEmail: `%${options.where.userEmail}%` });
    }
    if (options?.where?.userStatus) {
      query.andWhere('user.status = :userStatus', { userStatus: options.where.userStatus });
    }

    if (options?.orderBy?.userId) {
      query.orderBy('user.id', options.orderBy.userId);
    } else if (options?.orderBy?.userName) {
      query.orderBy('user.name', options.orderBy.userName);
    } else if (options?.orderBy?.userEmail) {
      query.orderBy('user.email', options.orderBy.userEmail);
    } else if (options?.orderBy?.userStatus) {
      query.orderBy('user.status', options.orderBy.userStatus);
    }

    if (options?.offset) {
      query.offset(options.offset);
    }

    if (options?.limit) {
      query.limit(options.limit);
    }

    return query;

  }

  public getUsers(options?: { where?: any, orderBy?: any, offset?: null | number, limit?: null | number }): SelectQueryBuilder<any[]> {
    const usersQuery = this.userQuery(options);
    return usersQuery;
  }

  public getUser(options?: { where?: any }): Promise<null | any> {
    const userQuery = this.userQuery(options)
    return userQuery.getOne();
  }

}
