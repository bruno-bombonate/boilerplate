import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Administrator } from '@app/boilerplate-database/modules/administrators/entities/administrator.entity.js';
import { Repository, SelectQueryBuilder, InsertResult, FindOptionsWhere, UpdateResult } from 'typeorm';

@Injectable()
export class AdministratorsService {

  constructor(
    @InjectRepository(Administrator)
    private readonly repository: Repository<Administrator>
  ) { }

  private administratorQuery(options?: { where?: any, orderBy?: any, offset?: null | number, limit?: null | number }): SelectQueryBuilder<any> {

    const query = this.repository
      .createQueryBuilder('administrator');

    if (options?.where?.administratorId) {
      query.andWhere('administrator.id = :administratorId', { administratorId: options.where.administratorId });
    }
    if (options?.where?.administratorName) {
      query.andWhere('administrator.name LIKE :administratorName', { administratorName: `%${options.where.administratorName}%` });
    }
    if (options?.where?.administratorEmail) {
      query.andWhere('administrator.email LIKE :administratorEmail', { administratorEmail: `%${options.where.administratorEmail}%` });
    }
    if (options?.where?.administratorStatus) {
      query.andWhere('administrator.status = :administratorStatus', { administratorStatus: options.where.administratorStatus });
    }

    if (options?.orderBy?.administratorId) {
      query.orderBy('administrator.id', options.orderBy.administratorId);
    } else if (options?.orderBy?.administratorName) {
      query.orderBy('administrator.name', options.orderBy.administratorName);
    } else if (options?.orderBy?.administratorEmail) {
      query.orderBy('administrator.email', options.orderBy.administratorEmail);
    } else if (options?.orderBy?.administratorStatus) {
      query.orderBy('administrator.status', options.orderBy.administratorStatus);
    }

    if (options?.offset) {
      query.offset(options.offset);
    }

    if (options?.limit) {
      query.limit(options.limit);
    }

    return query;

  }

  public createAdministrator(administrator: Partial<Administrator>): Promise<InsertResult> {
    return this.repository.insert(administrator);
  }

  public updateAdministrator(where: FindOptionsWhere<Administrator>, administrator: Partial<Administrator>): Promise<UpdateResult> {
    return this.repository.update(where, administrator);
  }

  public getAdministrators(options?: { where?: any, orderBy?: any, offset?: null | number, limit?: null | number }): SelectQueryBuilder<any[]> {
    const administratorsQuery = this.administratorQuery(options);
    return administratorsQuery;
  }

  public getAdministrator(options?: { where?: any }): Promise<null | any> {
    const administratorQuery = this.administratorQuery(options);
    return administratorQuery.getOne();
  }

  public getAdministratorWithPassword(options?: { where?: any }): Promise<null | any> {
    const administratorQuery = this.administratorQuery(options)
      .addSelect('administrator.password', 'administrator_password');
    return administratorQuery.getOne();
  }

}
