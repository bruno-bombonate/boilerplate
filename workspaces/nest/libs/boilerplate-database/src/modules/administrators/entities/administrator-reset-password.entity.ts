import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Column } from 'typeorm';
import { Administrator } from './administrator.entity.js';
import { ColumnDecimalTransformer } from '../../../utils/transformers/column-decimal-transformer.class.js';

@Entity()
export class AdministratorResetPassword {

  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Administrator, administrator => administrator.id, { nullable: false })
  @JoinColumn({ name: 'administratorId' })
  administratorId: number;

  @Column({ type: 'char', length: 128, nullable: false })
  token: string;

  @Column({ type: 'bigint', nullable: false, transformer: new ColumnDecimalTransformer() })
  createdAt: number;

  @Column({ type: 'bigint', nullable: true, transformer: new ColumnDecimalTransformer() })
  updatedAt: number;

}
