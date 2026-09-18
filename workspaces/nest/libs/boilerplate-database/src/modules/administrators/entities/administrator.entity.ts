import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ColumnDecimalTransformer } from '../../../utils/transformers/column-decimal-transformer.class.js';

@Entity()
export class Administrator {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 100, nullable: false, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 60, nullable: false, select: false })
  password: string;

  @Column({ type: 'boolean', nullable: false })
  status: boolean;

  @Column({ type: 'bigint', nullable: false, transformer: new ColumnDecimalTransformer() })
  createdAt: number;

}
