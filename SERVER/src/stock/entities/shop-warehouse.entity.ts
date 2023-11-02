import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import BitTransformer from 'src/transformers/bit.transformer';

import { ShopStock } from './shop-stock.entity';

@Entity('shop_warehouse')
@Unique('AK_shop_warehouse_code', ['code'])
export class ShopWarehouse {
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

  @Column({ name: 'shop_id', type: 'bigint', nullable: false })
  shopId: number;

  @Column({ name: 'code', type: 'varchar', length: 11, nullable: false })
  code: string;

  @Column({ name: 'name', type: 'varchar', length: 200, nullable: false })
  name: string;

  @Column({ name: 'postal_code', type: 'char', length: 8, nullable: false })
  postalCode: string;

  @Column({ name: 'prefecture_code', type: 'char', length: 2, nullable: false })
  prefectureCode: string;

  @Column({ name: 'city', type: 'varchar', length: 100, nullable: false })
  city: string;

  @Column({ name: 'address', type: 'varchar', length: 200, nullable: false })
  address: string;

  @Column({ name: 'phone_number', type: 'varchar', length: 11, nullable: true })
  phoneNumber: string;

  @Column({ name: 'status', type: 'int', nullable: false })
  status: number;

  @Column({
    name: 'is_deleted',
    type: 'bit',
    width: 1,
    default: false,
    nullable: false,
    transformer: new BitTransformer(),
  })
  isDeleted: boolean;

  @OneToMany(() => ShopStock, (shopStock) => shopStock.shopWarehouse)
  shopStocks: ShopStock[];
}
