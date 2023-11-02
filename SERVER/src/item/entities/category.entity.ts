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
import { Item } from './item.entity';

@Entity('category')
@Unique('AK_category_code', ['code'])
export class Category {
  @PrimaryGeneratedColumn({ name: 'id', type: 'bigint' })
  id: number;

  @CreateDateColumn({ name: 'created_at', type: 'datetime', nullable: false })
  createdAt: Date;

  @Column({ name: 'created_by', type: 'varchar', length: 36, nullable: false })
  createdBy: string;

  @UpdateDateColumn({ name: 'modified_at', type: 'datetime', nullable: false })
  modifiedAt: Date;

  @Column({ name: 'modified_by', type: 'varchar', length: 36, nullable: false })
  modifiedBy: string;

  @Column({ name: 'code', type: 'char', length: 9, nullable: false })
  code: string;

  @Column({ name: 'name', type: 'varchar', length: 200, nullable: false })
  name: string;

  @Column({ name: 'level', type: 'int', nullable: false })
  level: number;

  @Column({ name: 'parent_category_id', type: 'bigint', nullable: false })
  parentCategoryId: number;

  @Column({
    name: 'is_deleted',
    type: 'bit',
    default: false,
    nullable: false,
    transformer: new BitTransformer(),
  })
  isDeleted: boolean;

  @OneToMany(() => Item, (item) => item.category)
  items: Item[];
}
