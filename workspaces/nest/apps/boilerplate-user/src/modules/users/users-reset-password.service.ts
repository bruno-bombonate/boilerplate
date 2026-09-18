import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserResetPassword } from '@app/boilerplate-database/modules/users/entities/user-reset-password.entity.js';
import { Repository, SelectQueryBuilder, InsertResult, FindOptionsWhere, UpdateResult } from 'typeorm';
import { User } from '@app/boilerplate-database/modules/users/entities/user.entity.js';

@Injectable()
export class UsersResetPasswordService {

  constructor(
    @InjectRepository(UserResetPassword)
    private readonly repository: Repository<UserResetPassword>
  ) { }

  private userResetPasswordQuery(options?: { where?: any }): SelectQueryBuilder<any> {

    const query = this.repository
      .createQueryBuilder('user_reset_password')
      .innerJoinAndMapOne('user_reset_password.user', User, 'user_reset_password_user', 'user_reset_password_user.id = user_reset_password.userId');

    if (options?.where?.userResetPasswordId) {
      query.andWhere('user_reset_password.id = :userResetPasswordId', { userResetPasswordId: options.where.userResetPasswordId });
    }
    if (options?.where?.userResetPasswordToken) {
      query.andWhere('user_reset_password.token = :userResetPasswordToken', { userResetPasswordToken: options.where.userResetPasswordToken });
    }

    return query;

  }

  public createUserResetPassword(userResetPassword: Partial<UserResetPassword>): Promise<InsertResult> {
    return this.repository.insert(userResetPassword);
  }

  public updateUserResetPassword(where: FindOptionsWhere<UserResetPassword>, userResetPassword: Partial<UserResetPassword>): Promise<UpdateResult> {
    return this.repository.update(where, userResetPassword);
  }

  public getUserResetPassword(options?: { where?: any }): Promise<null | any> {
    const userResetPasswordQuery = this.userResetPasswordQuery(options)
    return userResetPasswordQuery.getOne();
  }

}
