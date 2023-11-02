import { AxiosResponse } from 'axios';
import axiosInstance from '../../base.api';
import { StandardRequest } from './requests/standard.request';
import { StandarResponse } from './responses/standard.response.tsresponses/standard.response';

const createStandard = async (params: StandardRequest) => {
  return axiosInstance
    .post('/standards', params)
    .then((response: AxiosResponse<StandarResponse>) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
};

const searchStandard = async (params: StandardRequest) => {
  return axiosInstance
    .get('/standards', { params })
    .then(
      (response: AxiosResponse<{ data: StandarResponse[]; totalRecord: number; skip: number; totalPage: number }>) => {
        return response.data;
      },
    )
    .catch((error) => {
      throw error;
    });
};
export { searchStandard, createStandard };
