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

import { MallWarehouseStatus } from '../enums/mall-warehouse-status.enum';
import { MallStock } from './mall-stock.entity';

@Entity('mall_warehouse')
@Unique('AK_mall_warehouse_code', ['code'])
export class MallWarehouse {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ name: 'created_at', type: 'datetime', nullable: false })
  createdAt: Date;

  @Column({
    name: 'created_by',
    type: 'varchar',
    length: 36,
    nullable: false,
  })
  createdBy: string;

  @UpdateDateColumn({
    name: 'modified_at',
    type: 'datetime',
    nullable: false,
  })
  modifiedAt: Date;

  @Column({
    name: 'modified_by',
    type: 'varchar',
    length: 36,
    nullable: false,
  })
  modifiedBy: string;

  @Column({
    name: 'code',
    type: 'char',
    length: 11,
    nullable: false,
  })
  code: string;

  @Column({
    name: 'name',
    type: 'varchar',
    length: 200,
    nullable: false,
  })
  name: string;

  @Column({
    name: 'postal_code',
    type: 'char',
    length: 8,
    nullable: false,
  })
  postalCode: string;

  @Column({
    name: 'prefecture_code',
    type: 'char',
    length: 2,
    nullable: false,
  })
  prefectureCode: string;

  @Column({
    name: 'city',
    type: 'varchar',
    length: 100,
    nullable: false,
  })
  city: string;

  @Column({
    name: 'address',
    type: 'varchar',
    length: 200,
    nullable: false,
  })
  address: string;

  @Column({
    name: 'phone_number',
    type: 'varchar',
    length: 11,
    nullable: true,
  })
  phoneNumber: string;

  @Column({ name: 'status', type: 'int', nullable: false })
  status: MallWarehouseStatus;

  @Column({
    name: 'operating_company_name',
    type: 'varchar',
    length: 200,
    nullable: false,
  })
  operatingCompanyName: string;

  @Column({
    name: 'operating_company_phone_number',
    type: 'varchar',
    length: 11,
    nullable: false,
  })
  operatingCompanyPhoneNumber: string;

  @Column({
    name: 'sendding_store_code',
    type: 'varchar',
    length: 20,
    nullable: false,
  })
  senddingStoreCode: string;

  @Column({
    name: 'is_deleted',
    type: 'bit',
    width: 1,
    default: false,
    transformer: new BitTransformer(),
  })
  isDeleted: boolean;

  @OneToMany(() => MallStock, (mallStock) => mallStock.mallWarehouse)
  mallStocks: MallStock[];
}
