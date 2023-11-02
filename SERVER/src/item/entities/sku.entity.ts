import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

import { Item } from './item.entity';
import { SkuClassification } from './sku-classification.entity';
import BitTransformer from 'src/transformers/bit.transformer';

@Entity('sku')
@Unique('AK_sku_code', ['code'])
export class Sku {
  @PrimaryGeneratedColumn({ name: 'id', type: 'bigint' })
  id: number;

  @Column({ name: 'created_at', type: 'datetime', nullable: false })
  createdAt: Date;

  @Column({ name: 'created_by', type: 'varchar', nullable: false, length: 36 })
  createdBy: string;

  @Column({ name: 'modified_at', type: 'datetime', nullable: false })
  modifiedAt: Date;

  @Column({ name: 'modified_by', type: 'varchar', nullable: false, length: 36 })
  modifiedBy: string;

  @Column({ name: 'item_id', type: 'bigint', nullable: false })
  itemId: number;

  @Column({ name: 'code', type: 'char', length: 20, nullable: false })
  code: string;

  @Column({ name: 'jan_code', type: 'char', length: 13, nullable: false })
  janCode: string;

  @Column({ name: 'price', type: 'int', nullable: false })
  price: number;

  @Column({
    name: 'is_displayed',
    type: 'bit',
    nullable: false,
    width: 1,
    default: false,
    transformer: new BitTransformer(),
  })
  isDisplayed: boolean;

  @Column({ name: 'display_start_at', type: 'datetime', nullable: true })
  displayStartAt: Date;

  @Column({ name: 'display_end_at', type: 'datetime', nullable: true })
  displayEndAt: Date;

  @Column({ name: 'sale_start_at', type: 'datetime', nullable: true })
  saleStartAt: Date;

  @Column({ name: 'sale_end_at', type: 'datetime', nullable: true })
  saleEndAt: Date;

  @Column({
    name: 'is_deleted',
    type: 'bit',
    nullable: false,
    width: 1,
    default: false,
    transformer: new BitTransformer(),
  })
  isDeleted: boolean;

  //JOIN TO ITEM TABLE
  @ManyToOne(() => Item, (item) => item.sku)
  @JoinColumn({ name: 'item_id', foreignKeyConstraintName: 'FK_sku_item_id' })
  item: Item;

  //JOIN TO SKU_CLASSIFICATION TABLE
  @OneToMany(
    () => SkuClassification,
    (skuClassification) => skuClassification.sku,
  )
  skuClassifications: SkuClassification[];
}
