import { ShopWarehouse } from '../entities/shop-warehouse.entity';
import { MallWarehouseStatus } from '../enums/mall-warehouse-status.enum';

export class ShopWarehouseResponse {
  id: string;

  createdAt: number;

  createdBy: string;

  modifiedAt: number;

  modifiedBy: string;

  code: string;

  name: string;

  postalCode: string;

  prefectureCode: string;

  city: string;

  address: string;

  phoneNumber: string;

  status: string;

  constructor(shopWarehouse: ShopWarehouse) {
    this.id = shopWarehouse.id.toString();
    this.createdAt = shopWarehouse.createdAt.getTime();
    this.createdBy = shopWarehouse.createdBy;
    this.modifiedAt = shopWarehouse.modifiedAt.getTime();
    this.modifiedBy = shopWarehouse.modifiedBy;
    this.code = shopWarehouse.code;
    this.name = shopWarehouse.name;
    this.postalCode = shopWarehouse.postalCode;
    this.prefectureCode = shopWarehouse.prefectureCode;
    this.city = shopWarehouse.city;
    this.address = shopWarehouse.address;
    this.phoneNumber = shopWarehouse.phoneNumber;
    this.status = MallWarehouseStatus[shopWarehouse.status];
  }
}
