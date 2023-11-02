import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import BitTransformer from 'src/transformers/bit.transformer';

@Entity('sku_preview')
@Unique('AK_sku_preview_item_id_sku_id', ['itemId', 'skuId'])
export class SkuPreview {
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

  @Column({ name: 'sku_id', type: 'bigint', nullable: false })
  skuId: number;

  @Column({ name: 'code', type: 'char', length: 20, nullable: true })
  code: string;

  @Column({ name: 'jan_code', type: 'char', length: 13, nullable: false })
  janCode: string;

  @Column({ name: 'price', type: 'int', nullable: false })
  price: number;

  @Column({
    name: 'is_displayed',
    type: 'bit',
    width: 1,
    default: false,
    nullable: false,
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
}
