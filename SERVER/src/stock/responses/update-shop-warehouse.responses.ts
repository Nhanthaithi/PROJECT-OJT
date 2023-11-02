import { ShopWarehouse } from '../entities/shop-warehouse.entity';
import { MallWarehouseStatus } from '../enums/mall-warehouse-status.enum';

export class UpdateResponse {
  name: string;

  postalCode: string;

  prefectureCode: string;

  city: string;

  address: string;

  status: string;

  phoneNumber: string;

  createdAt: number;

  createdBy: string;

  modifiedAt: number;

  modifiedBy: string;

  constructor(shopWarehouse: ShopWarehouse) {
    this.name = shopWarehouse.name;
    this.postalCode = shopWarehouse.postalCode;
    this.prefectureCode = shopWarehouse.prefectureCode;
    this.city = shopWarehouse.city;
    this.address = shopWarehouse.address;
    this.status = MallWarehouseStatus[shopWarehouse.status];
    this.phoneNumber = shopWarehouse.phoneNumber;
    this.createdAt = shopWarehouse.createdAt.getTime();
    this.createdBy = shopWarehouse.createdBy;
    this.modifiedAt = shopWarehouse.modifiedAt.getTime();
    this.modifiedBy = shopWarehouse.modifiedBy;
  }
}
