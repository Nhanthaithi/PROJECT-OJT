import { MallWarehouseStatus } from '../enums/mall-warehouse-status.enum';
import { MallWarehouse } from '../entities/mall-warehouse.entity';

export class MallWarehouseResponse {
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

  operatingCompanyName: string;

  operatingCompanyPhoneNumber: string;

  senddingStoreCode: string;

  constructor(mallWarehouse: MallWarehouse) {
    this.id = mallWarehouse.id.toString();
    this.createdAt = mallWarehouse.createdAt.getTime();
    this.createdBy = mallWarehouse.createdBy;
    this.modifiedAt = mallWarehouse.modifiedAt.getTime();
    this.modifiedBy = mallWarehouse.modifiedBy;
    this.code = mallWarehouse.code;
    this.name = mallWarehouse.name;
    this.postalCode = mallWarehouse.postalCode;
    this.prefectureCode = mallWarehouse.prefectureCode;
    this.city = mallWarehouse.city;
    this.address = mallWarehouse.address;
    this.phoneNumber = mallWarehouse.phoneNumber;
    this.status =
      mallWarehouse.status === MallWarehouseStatus.ACTIVE ? 'ACTIVE' : 'STOP';
    this.operatingCompanyName = mallWarehouse.operatingCompanyName;
    this.operatingCompanyPhoneNumber =
      mallWarehouse.operatingCompanyPhoneNumber;
    this.senddingStoreCode = mallWarehouse.senddingStoreCode;
  }
}

export class MallWarehouseResponses {
  data: MallWarehouseResponse[];

  totalRecords: number;

  limit: number;

  totalPages: number;

  constructor(
    data: MallWarehouseResponse[],
    totalRecords: number,
    limit: number,
    totalPages: number,
  ) {
    this.data = data;

    this.totalPages = totalPages;

    this.limit = limit;

    this.totalRecords = totalRecords;
  }
}
