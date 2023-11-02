import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import BitTransformer from 'src/transformers/bit.transformer';

@Entity('item_standard_preview')
@Unique('AK_item_standard_preview_item_standard_id', ['itemStandardId'])
export class ItemStandardPreview {
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

  @Column({ name: 'item_standard_id', type: 'bigint', nullable: false })
  itemStandardId: number;

  @Column({ name: 'item_id', type: 'bigint', nullable: false })
  itemId: number;

  @Column({ name: 'standard_id', type: 'bigint', nullable: false })
  standardId: number;

  @Column({
    name: 'is_main',
    type: 'bit',
    width: 1,
    default: false,
    nullable: false,
    transformer: new BitTransformer(),
  })
  isMain: boolean;
}
