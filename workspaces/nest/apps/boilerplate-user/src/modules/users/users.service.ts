import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@app/boilerplate-database/modules/users/entities/user.entity.js';
import { Repository, SelectQueryBuilder, InsertResult, FindOptionsWhere, UpdateResult } from 'typeorm';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>
  ) { }

  private userQuery(options?: { where?: any }): SelectQueryBuilder<any> {

    const query = this.repository
      .createQueryBuilder('user');

    if (options?.where?.userId) {
      query.andWhere('user.id = :userId', { userId: options.where.userId });
    }
    if (options?.where?.userEmail) {
      query.andWhere('user.email = :userEmail', { userEmail: options.where.userEmail });
    }

    return query;

  }

  public createUser(user: Partial<User>): Promise<InsertResult> {
    return this.repository.insert(user);
  }

  public updateUser(where: FindOptionsWhere<User>, user: Partial<User>): Promise<UpdateResult> {
    return this.repository.update(where, user);
  }

  public getUsers(options?: { where?: any, orderBy?: any, offset?: number, limit?: number }): SelectQueryBuilder<any[]> {
    const usersQuery = this.userQuery(options);
    return usersQuery;
  }

  public getUser(options?: { where?: any }): Promise<null | any> {
    const userQuery = this.userQuery(options);
    return userQuery.getOne();
  }

  public getUserWithPassword(options?: { where?: any }): Promise<null | any> {
    const userQuery = this.userQuery(options)
      .addSelect('user.password', 'user_password');
    return userQuery.getOne();
  }

}
