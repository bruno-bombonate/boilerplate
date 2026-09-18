import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Column } from 'typeorm';
import { User } from './user.entity.js';
import { ColumnDecimalTransformer } from '../../../utils/transformers/column-decimal-transformer.class.js';

@Entity()
export class UserResetPassword {

  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.id, { nullable: false })
  @JoinColumn({ name: 'userId' })
  userId: number;

  @Column({ type: 'char', length: 128, nullable: false })
  token: string;

  @Column({ type: 'bigint', nullable: false, transformer: new ColumnDecimalTransformer() })
  createdAt: number;

  @Column({ type: 'bigint', nullable: true, transformer: new ColumnDecimalTransformer() })
  updatedAt: number;

}
