export interface MallWarehouseResponse {
  id: number;

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

  phoneNumber: number;

  status: string;

  operatingCompanyName: string;

  operatingCompanyPhoneNumber: string;

  senddingStoreCode: string;
}

export interface SearchMallWarehouseResponse {
  data: MallWarehouseResponse[];

  totalPages: number;

  totalRecords: number;

  limit: string;
}
