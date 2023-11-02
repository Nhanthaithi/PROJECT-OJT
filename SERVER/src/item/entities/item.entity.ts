import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import BitTransformer from 'src/transformers/bit.transformer';

import { ItemType } from '../enums/item-type.enum';
import { ItemReducedTaxRateType } from '../enums/item-reduced-tax-rate-type.enum';

import { Sku } from './sku.entity';
import { ItemImage } from './item-image.entity';
import { ItemStandard } from './item-standard.entity';
import { ItemImageUploadTask } from './item-image-upload-task.entity';
import { ItemPreview } from './item-preview.entity';
import { Category } from './category.entity';
import { Brand } from './brand.entity';

@Entity('item')
@Unique('AK_item_code', ['code'])
export class Item {
  @PrimaryGeneratedColumn({ name: 'id', type: 'bigint' })
  id: number;

  @CreateDateColumn({ name: 'created_at', type: 'datetime', nullable: false })
  createdAt: Date;

  @Column({ name: 'created_by', type: 'varchar', nullable: false, length: 36 })
  createdBy: string;

  @UpdateDateColumn({ name: 'modified_at', type: 'datetime', nullable: false })
  modifiedAt: Date;

  @Column({ name: 'modified_by', type: 'varchar', nullable: false, length: 36 })
  modifiedBy: string;

  @Column({ name: 'code', type: 'char', length: 20, nullable: false })
  code: string;

  @Column({ name: 'name', type: 'varchar', nullable: false, length: 200 })
  name: string;

  @Column({ name: 'type', type: 'int', nullable: false })
  type: ItemType;

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
  reducedTaxRateType: ItemReducedTaxRateType;

  @Column({ name: 'special_delivery_fee', type: 'int', nullable: true })
  specialDeliveryFee: number;

  @Column({
    name: 'is_displayed',
    type: 'bit',
    width: 1,
    default: true,
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
    nullable: false,
    width: 1,
    default: true,
    transformer: new BitTransformer(),
  })
  isNotReturnable: boolean;

  @Column({
    name: 'is_not_required_stock_management',
    type: 'bit',
    nullable: false,
    width: 1,
    default: false,
    transformer: new BitTransformer(),
  })
  isNotRequiredStockManagement: boolean;

  @Column({
    name: 'shop_lead_time_id',
    type: 'bigint',
    nullable: false,
  })
  shopLeadTimeId: number;

  @Column({
    name: 'is_deleted',
    type: 'bit',
    nullable: false,
    width: 1,
    default: false,
    transformer: new BitTransformer(),
  })
  isDeleted: boolean;

  @OneToMany(() => Sku, (sku) => sku.item)
  sku: Sku[];

  @OneToMany(() => ItemImage, (itemImage) => itemImage.item)
  itemImages: ItemImage[];

  @OneToMany(() => ItemStandard, (itemStandard) => itemStandard.item)
  itemStandards: ItemStandard[];

  @OneToMany(
    () => ItemImageUploadTask,
    (itemImageUploadTask) => itemImageUploadTask.item,
  )
  itemImageUploadTasks: ItemImageUploadTask[];

  @OneToOne(() => ItemPreview, (itemPreview) => itemPreview.item)
  itemPreview: ItemPreview;

  @ManyToOne(() => Category, (category) => category.items)
  @JoinColumn({
    name: 'category_id',
    foreignKeyConstraintName: 'FK_item_category_id',
  })
  category: Category;

  @ManyToOne(() => Brand, (brand: Brand) => brand.items)
  @JoinColumn({
    name: 'brand_id',
    foreignKeyConstraintName: 'FK_item_brand_id',
  })
  brand: Brand;
}
