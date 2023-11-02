import { ReducerWithInitialState } from '@reduxjs/toolkit/dist/createReducer';
import { ActionReducerMapBuilder, PayloadAction, createReducer } from '@reduxjs/toolkit';
import { CategoryResponse } from '../../apis/item/category/responses/get-list-category.response';
import { getListCategoryAction } from '../actions/category.action';

const iniState: CategoryResponse[] = [];

const categoryReducer: ReducerWithInitialState<CategoryResponse[]> = createReducer(
  iniState,
  (builder: ActionReducerMapBuilder<CategoryResponse[]>) => {
    builder.addCase(getListCategoryAction, (state: CategoryResponse[], action: PayloadAction<CategoryResponse[]>) => {
      return (state = action.payload);
    });
  },
);

export default categoryReducer;
