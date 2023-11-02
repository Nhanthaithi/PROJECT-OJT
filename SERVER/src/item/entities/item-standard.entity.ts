import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import BitTransformer from 'src/transformers/bit.transformer';

import { Standard } from './standard.entity';
import { Item } from './item.entity';
import { SkuClassification } from './sku-classification.entity';

@Entity('item_standard')
@Unique('AK_item-standard_item-id_standard-id', ['itemId', 'standardId'])
export class ItemStandard {
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

  @Column({
    name: 'is_deleted',
    type: 'bit',
    width: 1,
    default: false,
    nullable: false,
    transformer: new BitTransformer(),
  })
  isDeleted: boolean;

  //item_standard => item
  @ManyToOne(() => Item, (item) => item.itemStandards)
  @JoinColumn({ name: 'item_id' })
  item: Item;

  //item_standard => standard
  @ManyToOne(() => Standard, (standard) => standard.itemStandards)
  @JoinColumn({ name: 'standard_id' })
  standard: Standard;

  //item_standard => sku_classification
  @OneToMany(
    () => SkuClassification,
    (skuClassifications) => skuClassifications.itemStandard,
  )
  skuClassifications: SkuClassification[];
}
