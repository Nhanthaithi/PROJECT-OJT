import { AxiosResponse } from 'axios';
import axiosInstance from '../base.api';
import { ItemRequest } from './requests/item.request';
import { ItemResponse } from './responses/item.response';
import { ERROR_CODES, ERROR_MESSAGES } from '../../constants/errors.constant';

const getItemAPI = async (
  itemRequest?: Partial<ItemRequest>,
): Promise<{ data: ItemResponse[]; totalPage: number; count: number; limit: number } | { message: string }> => {
  return axiosInstance
    .get('/items/search', { params: itemRequest })
    .then((response: AxiosResponse<{ data: ItemResponse[]; totalPage: number; count: number; limit: number }>) => {
      return response.data;
    })
    .catch((error) => {
      switch (error.response?.status) {
        case ERROR_CODES.INVALID_PARAM:
          return { message: ERROR_MESSAGES[ERROR_CODES.INVALID_PARAM] };
        default:
          return { message: ERROR_MESSAGES.DEFAULT };
      }
    });
};

export { getItemAPI };
