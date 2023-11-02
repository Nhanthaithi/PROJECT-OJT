export interface CreateShopWarehouseRequest {
  name: string;
  shopName: string;
  code: string;
  postalCode: string;
  prefectureCode: string;
  city: string;
  municipalities: string;
  address: string;
  phoneNumber: string;
  status: number;
  shopId: number;
  createdBy: string;
  modifiedBy: string;
}

export interface CreateShopWarehouseDTO {
  name: string;
  shopName: string;
  postalCodeBefore: string;
  postalCodeAfter: string;
  city: string;
  municipalities: string;
  address: string;
  phoneNumber: string;
  status: number;
  shopId: number;
  // radioValues: string;
}
