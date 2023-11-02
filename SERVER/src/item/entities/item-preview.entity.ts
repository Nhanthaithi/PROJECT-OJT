import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import BitTransformer from 'src/transformers/bit.transformer';

import { ItemPreviewType } from '../enums/item-preview-type.enum';
import { Item } from './item.entity';
import { ItemPreviewReducedTaxRateType } from '../enums/item-preview-reduced-tax-rate-type.enum';

@Entity('item_preview')
@Unique('AK_item_preview_item_id', ['itemId'])
@Unique('AK_item_preview_code', ['code'])
export class ItemPreview {
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

  @Column({ name: 'item_id', type: 'bigint', nullable: false })
  itemId: number;

  @Column({ name: 'code', type: 'char', length: 16, nullable: false })
  code: string;

  @Column({ name: 'name', type: 'varchar', length: 200, nullable: false })
  name: string;

  @Column({ name: 'type', type: 'int', nullable: false })
  type: ItemPreviewType;

  @Column({ name: 'shop_id', type: 'bigint', nullable: false })
  shopId: number;

  @Column({ name: 'brand_id', type: 'bigint', nullable: false })
  brandId: number;

  @Column({ name: 'category_id', type: 'bigint', nullable: false })
  categoryId: number;

  @Column({
    name: 'description',
    type: 'varchar',
    length: 1000,
    nullable: false,
  })
  description: string;

  @Column({ name: 'spec', type: 'varchar', length: 1000, nullable: true })
  spec: string;

  @Column({ name: 'reduced_tax_rate_type', type: 'int', nullable: false })
  reducedTaxRateType: ItemPreviewReducedTaxRateType;

  @Column({ name: 'special_delivery_fee', type: 'int', nullable: true })
  specialDeliveryFee: number;

  @Column({
    name: 'is_displayed',
    type: 'bit',
    width: 1,
    default: false,
    nullable: false,
    transformer: new BitTransformer(),
  })
  isDisplayed: boolean;

  @Column({ name: 'display_start_at', type: 'datetime', nullable: false })
  displayStartAt: Date;

  @Column({ name: 'display_end_at', type: 'datetime', nullable: false })
  displayEndAt: Date;

  @Column({ name: 'sale_start_at', type: 'datetime', nullable: false })
  saleStartAt: Date;

  @Column({ name: 'sale_end_at', type: 'datetime', nullable: false })
  saleEndAt: Date;

  @Column({
    name: 'is_not_returnable',
    type: 'bit',
    width: 1,
    default: false,
    nullable: false,
    transformer: new BitTransformer(),
  })
  isNotReturnable: boolean;

  @Column({
    name: 'is_not_required_stock_management',
    type: 'bit',
    width: 1,
    default: false,
    nullable: false,
    transformer: new BitTransformer(),
  })
  isNotRequiredStockManagement: boolean;

  @Column({ name: 'shop_lead_time_id', type: 'bigint', nullable: false })
  shopLeadTimeId: number;

  @OneToOne(() => Item, (item: any) => item.id, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({
    name: 'item_id',
    foreignKeyConstraintName: 'FK_item_preview_item_id',
  })
  item: Item;
}
