import EditWarehouseDTO from '../stock/response/editShopWarehouse.dto';

const initialValues: Partial<EditWarehouseDTO> = {
  address: '',
  city: '',
  code: '',
  createdAt: 0,
  createdBy: '',
  id: '',
  modifiedAt: 0,
  modifiedBy: '',
  name: '',
  phoneNumber: '',
  postalCode: '',
  prefectureCode: '',
  shopId: '',
  status: 1,
};
export default initialValues;
