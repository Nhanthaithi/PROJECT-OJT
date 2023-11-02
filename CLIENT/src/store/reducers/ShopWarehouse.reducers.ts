import { ReducerWithInitialState } from '@reduxjs/toolkit/dist/createReducer';
import { ActionReducerMapBuilder, PayloadAction, createReducer } from '@reduxjs/toolkit';
import { getShopWarehouse } from '../actions/ShopWarehouse.action';
import { ShopWarehouseResponse } from '../../apis/stock/response/ShopWarehouse.response';

const iniState: ShopWarehouseResponse[] = [];

const shopWarehouseReducer: ReducerWithInitialState<ShopWarehouseResponse[]> = createReducer(
  iniState,
  (builder: ActionReducerMapBuilder<ShopWarehouseResponse[]>) => {
    builder.addCase(
      getShopWarehouse,
      (state: ShopWarehouseResponse[], action: PayloadAction<ShopWarehouseResponse[]>) => {
        return (state = action.payload);
      },
    );
  },
);

export default shopWarehouseReducer;
