import { PayloadActionCreator, createAction } from '@reduxjs/toolkit';
import { ShopWarehouseResponse } from '../../apis/stock/response/ShopWarehouse.response';

export const getShopWarehouse: PayloadActionCreator<ShopWarehouseResponse[]> = createAction('GET_SHOP_WAREHOUSE');
export const editShopWarehouse: PayloadActionCreator<ShopWarehouseResponse> = createAction('EDIT_SHOP_WAREHOUSE');
