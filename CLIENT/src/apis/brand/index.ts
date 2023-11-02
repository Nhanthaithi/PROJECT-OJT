import { AxiosResponse } from 'axios';
import axiosInstance from '../base.api';
import { BrandResquest } from './requests/brand.request';
import { BrandResponse } from './responses/brand.response';

const getBrandAPI = async (
  brandQuery?: BrandResquest,
): Promise<{ data: BrandResponse[]; count: number; totalPage: number }> => {
  return axiosInstance
    .get('/brands', { params: brandQuery })
    .then((response: AxiosResponse<{ data: BrandResponse[]; count: number; totalPage: number }>) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
};

export { getBrandAPI };
