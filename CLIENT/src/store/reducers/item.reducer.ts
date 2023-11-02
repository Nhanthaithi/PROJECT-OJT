import { ReducerWithInitialState } from '@reduxjs/toolkit/dist/createReducer';
import { ItemResponse } from './../../apis/item/responses/item.response';
import { ActionReducerMapBuilder, PayloadAction, createReducer } from '@reduxjs/toolkit';
import { getItemAction } from '../actions/item.action';

const iniState: { data: ItemResponse[]; totalPage: number; count: number; limit: number } = {
  data: [],
  totalPage: 1,
  count: 1,
  limit: 20,
};

const itemReducer: ReducerWithInitialState<{ data: ItemResponse[]; totalPage: number; count: number; limit: number }> =
  createReducer(
    iniState,
    (builder: ActionReducerMapBuilder<{ data: ItemResponse[]; totalPage: number; count: number; limit: number }>) => {
      builder.addCase(
        getItemAction,
        (
          state: { data: ItemResponse[]; totalPage: number; count: number; limit: number },
          action: PayloadAction<{ data: ItemResponse[]; totalPage: number; count: number; limit: number }>,
        ) => {
          return (state = action.payload);
        },
      );
    },
  );

export default itemReducer;
