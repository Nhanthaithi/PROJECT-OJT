import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import BitTransformer from 'src/transformers/bit.transformer';

import { ItemStandard } from './item-standard.entity';
import { Classification } from './classification.entity';

@Entity('standard')
@Unique('AK_standard_code', ['code'])
export class Standard {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ name: 'created_at', type: 'datetime', nullable: false })
  createdAt: Date;

  @Column({ name: 'created_by', type: 'varchar', length: 36, nullable: false })
  createdBy: string;

  @UpdateDateColumn({ name: 'modified_at', type: 'datetime', nullable: false })
  modifiedAt: Date;

  @Column({ name: 'modified_by', type: 'varchar', length: 36, nullable: false })
  modifiedBy: string;

  @Column({ name: 'code', type: 'char', length: 4, nullable: false })
  code: string;

  @Column({ name: 'name', type: 'varchar', length: 200, nullable: false })
  name: string;

  @Column({ name: 'label', type: 'varchar', length: 200, nullable: false })
  label: string;

  @Column({
    name: 'description',
    type: 'varchar',
    length: 1000,
    nullable: true,
  })
  description: string;

  @Column({
    name: 'is_deleted',
    type: 'bit',
    width: 1,
    default: false,
    nullable: false,
    transformer: new BitTransformer(),
  })
  isDeleted: boolean;

  @OneToMany(() => ItemStandard, (itemStandard) => itemStandard.standard)
  itemStandards: ItemStandard[];

  @OneToMany(() => Classification, (classification) => classification.standard)
  classifications: Classification[];
}
