import { PayloadActionCreator, createAction } from '@reduxjs/toolkit';
import { CategoryResponse } from '../../apis/item/category/responses/get-list-category.response';
import { CategoryByIdResponse } from '../../apis/item/category/responses/get-category.response';

export const getListCategoryAction: PayloadActionCreator<CategoryResponse[]> = createAction('GET_LIST_CATEGORY');
export const getCategoryByIdAction: PayloadActionCreator<CategoryByIdResponse> = createAction('GET_CATEGORY_BY_ID');
export const refreshAction: PayloadActionCreator<boolean> = createAction('REFRESH');
