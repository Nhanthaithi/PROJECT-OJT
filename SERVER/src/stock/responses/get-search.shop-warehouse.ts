import { ShopWarehouse } from '../entities/shop-warehouse.entity';
import { MallWarehouseStatus } from '../enums/mall-warehouse-status.enum';

export class ShopWarehouseGetAllResponse {
  id: number;

  code: string;

  name: string;

  shopId: number;

  shopName: string;

  postalCode: string;

  prefectureCode: string;

  city: string;

  address: string;

  status: string;

  constructor(shopWarehouse: ShopWarehouse) {
    this.id = shopWarehouse.id;
    this.code = shopWarehouse.code;
    this.name = shopWarehouse.name;
    this.shopId = shopWarehouse.shopId;
    this.postalCode = shopWarehouse.postalCode;
    this.prefectureCode = shopWarehouse.prefectureCode;
    this.city = shopWarehouse.city;
    this.address = shopWarehouse.address;
    this.status = MallWarehouseStatus[shopWarehouse.status];
  }
}
