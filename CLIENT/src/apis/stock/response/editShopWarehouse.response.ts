interface EditWarehouseResponse {
  id: string;

  name: string;

  shopId: string;

  code: string;

  postalCode: string;

  prefectureCode: string;

  city: string;

  address: string;

  status?: number;

  phoneNumber: string;

  createdAt: number;

  createdBy: string;

  modifiedAt: number;

  modifiedBy: string;
}
export default EditWarehouseResponse;
