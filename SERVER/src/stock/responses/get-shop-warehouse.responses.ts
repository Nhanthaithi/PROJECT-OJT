import { ShopWarehouse } from '../entities/shop-warehouse.entity';

export class ShopWarehouseGetAllResponse {
  id: number;

  code: string;

  name: string;

  shopId: number;

  postalCode: string;

  prefectureCode: string;

  city: string;

  address: string;

  phoneNumber: string;

  createdAt: number;

  createdBy: string;

  modifiedAt: number;

  modifiedBy: string;

  constructor(shopWarehouse: ShopWarehouse) {
    this.id = shopWarehouse.id;
    this.code = shopWarehouse.code;
    this.name = shopWarehouse.name;
    this.shopId = shopWarehouse.shopId;
    this.postalCode = shopWarehouse.postalCode;
    this.prefectureCode = shopWarehouse.prefectureCode;
    this.city = shopWarehouse.city;
    this.address = shopWarehouse.address;
    this.phoneNumber = shopWarehouse.phoneNumber;
    this.createdAt = shopWarehouse.createdAt.getTime();
    this.createdBy = shopWarehouse.createdBy;
    this.modifiedAt = shopWarehouse.modifiedAt.getTime();
    this.modifiedBy = shopWarehouse.modifiedBy;
  }
}
