import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import BitTransformer from 'src/transformers/bit.transformer';

import { ShopWarehouse } from './shop-warehouse.entity';

@Entity('shop_stock')
@Unique('AK_shop_stock_shop_warehouse_id_shop_id_jan_code', [
  'shopWarehouseId',
  'shopId',
  'janCode',
])
export class ShopStock {
  @PrimaryGeneratedColumn({ name: 'id', type: 'bigint' })
  id: number;

  @CreateDateColumn({ name: 'created_at', type: 'datetime', nullable: false })
  createdAt: Date;

  @Column({ name: 'created_by', type: 'varchar', length: 36, nullable: false })
  createdBy: string;

  @CreateDateColumn({ name: 'modified_at', type: 'datetime', nullable: false })
  modifiedAt: Date;

  @Column({ name: 'modified_by', type: 'varchar', length: 36, nullable: false })
  modifiedBy: string;

  @Column({ name: 'shop_warehouse_id', type: 'bigint', nullable: false })
  shopWarehouseId: number;

  @Column({ name: 'shop_id', type: 'bigint', nullable: false })
  shopId: number;

  @Column({ name: 'jan_code', type: 'char', length: 13, nullable: false })
  janCode: string;

  @Column({ name: 'amount', type: 'int', nullable: false })
  amount: number;

  @Column({
    name: 'is_deleted',
    type: 'bit',
    width: 1,
    default: false,
    nullable: false,
    transformer: new BitTransformer(),
  })
  isDeleted: boolean;

  @ManyToOne(() => ShopWarehouse, (shopWarehouse) => shopWarehouse.shopStocks)
  @JoinColumn({
    name: 'shop_warehouse_id',
    foreignKeyConstraintName: 'FK_shop_stock_shop_warehouse_id',
  })
  shopWarehouse: ShopWarehouse;
}
