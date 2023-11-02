export interface CreateShopWarehouseRequest {
  name: string;

  shopId: number;

  code: string;

  postalCode: string;

  prefectureCode: string;

  city: string;

  address: string;

  status: number;

  phoneNumber: string;

  createdBy: string;

  modifiedBy: string;
}
export default CreateShopWarehouseRequest;
