import { ItemResponse } from './../../apis/item/responses/item.response';
import { PayloadActionCreator, createAction } from '@reduxjs/toolkit';

export const getItemAction: PayloadActionCreator<{
  data: ItemResponse[];
  totalPage: number;
  count: number;
  limit: number;
}> = createAction('GET_ITEM');
