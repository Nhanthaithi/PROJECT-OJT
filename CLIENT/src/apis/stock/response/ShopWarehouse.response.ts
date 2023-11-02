export interface ShopWarehouseResponse {
  id: string | '';
  code: string | '';
  name: string | '';
  postalCode: string | '';
  prefectureCode: string | '';
  address: string | '';
  city: string | '';
  phoneNumber: string | '';
  status: number | 1;
  shopId: string | '';
  createdAt: number;
  createdBy: string | '';
  modifiedAt: number;
  modifiedBy: string | '';
}
