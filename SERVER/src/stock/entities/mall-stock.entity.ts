import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import BitTransformer from '../../transformers/bit.transformer';

import { MallWarehouse } from './mall-warehouse.entity';

@Entity('mall_stock')
@Unique('AK_mall_stock_mall_warehouse_id_jan_code_shop_id', [
  'mallWarehouseId',
  'janCode',
  'shopId',
])
export class MallStock {
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

  @Column({ name: 'mall_warehouse_id', type: 'bigint', nullable: false })
  mallWarehouseId: number;

  @Column({ name: 'shop_id', type: 'bigint', nullable: false })
  shopId: number;

  @Column({ name: 'jan_code', type: 'char', length: 13, nullable: false })
  janCode: string;

  @Column({ name: 'amount', type: 'integer', nullable: false })
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

  @ManyToOne(() => MallWarehouse, (item) => item.mallStocks)
  @JoinColumn({
    name: 'mall_warehouse_id',
    foreignKeyConstraintName: 'FK_mall_stock_mall_warehouse_id',
  })
  mallWarehouse: MallWarehouse;
}
