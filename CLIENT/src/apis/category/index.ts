import { AxiosResponse } from 'axios';
import axiosInstance from '../base.api';
import { CategoryResquest } from './requests/category.request';
import { CategoryResponse } from './response/category.response';

const getCategoryAPI = async (categoryQuery?: CategoryResquest): Promise<{ data: CategoryResponse[] }> => {
  return axiosInstance
    .get('/categories', { params: categoryQuery })
    .then((response: AxiosResponse<{ data: CategoryResponse[] }>) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
};

export { getCategoryAPI };
