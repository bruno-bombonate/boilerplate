import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AdministratorResetPassword } from '@app/boilerplate-database/modules/administrators/entities/administrator-reset-password.entity.js';
import { Repository, SelectQueryBuilder, InsertResult, FindOptionsWhere, UpdateResult } from 'typeorm';
import { Administrator } from '@app/boilerplate-database/modules/administrators/entities/administrator.entity.js';

@Injectable()
export class AdministratorsResetPasswordService {

  constructor(
    @InjectRepository(AdministratorResetPassword)
    private readonly repository: Repository<AdministratorResetPassword>
  ) { }

  private administratorResetPasswordQuery(options?: { where?: any }): SelectQueryBuilder<any> {

    const query = this.repository
      .createQueryBuilder('administrator_reset_password')
      .innerJoinAndMapOne('administrator_reset_password.administrator', Administrator, 'administrator_reset_password_administrator', 'administrator_reset_password_administrator.id = administrator_reset_password.administratorId');

    if (options?.where?.administratorResetPasswordId) {
      query.andWhere('administrator_reset_password.id = :administratorResetPasswordId', { administratorResetPasswordId: options.where.administratorResetPasswordId });
    }
    if (options?.where?.administratorResetPasswordToken) {
      query.andWhere('administrator_reset_password.token = :administratorResetPasswordToken', { administratorResetPasswordToken: options.where.administratorResetPasswordToken });
    }

    return query;

  }

  public createAdministratorResetPassword(administratorResetPassword: Partial<AdministratorResetPassword>): Promise<InsertResult> {
    return this.repository.insert(administratorResetPassword);
  }

  public updateAdministratorResetPassword(where: FindOptionsWhere<AdministratorResetPassword>, administratorResetPassword: Partial<AdministratorResetPassword>): Promise<UpdateResult> {
    return this.repository.update(where, administratorResetPassword);
  }

  public getAdministratorResetPassword(options?: { where?: any }): Promise<null | any> {
    const administratorResetPasswordQuery = this.administratorResetPasswordQuery(options)
    return administratorResetPasswordQuery.getOne();
  }

}
