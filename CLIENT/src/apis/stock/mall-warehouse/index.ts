import { AxiosResponse } from 'axios';

import axiosInstance from '../../base.api';
import { CreateMallWarehouseRequest } from './requests/create-mall-warehouse.request';
import { EditMallWarehouseResponse } from './responses/edit-mall-warehouse.response';
import { EditMallWarehouseRequest } from './requests/edit-mall-warehouse.request';
import { MallWarehouseRequest } from './requests/mall-warehouse.request';
import { MallWarehouseResponse, SearchMallWarehouseResponse } from './responses/mall-warehouse.response';

const createMallWarehouseApi = async (requestBody: CreateMallWarehouseRequest): Promise<undefined> => {
  return axiosInstance
    .post('/mall-warehouses', requestBody)
    .then((response: AxiosResponse<undefined>) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
};

const getMallWarehouseApi = async (id: number): Promise<EditMallWarehouseResponse> => {
  return axiosInstance
    .get(`/mall-warehouses/${id}`)
    .then((response: AxiosResponse<EditMallWarehouseResponse>) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
};

const gethMallWarehouseById = async (id: number): Promise<MallWarehouseResponse> => {
  return axiosInstance
    .get(`/mall-warehouses/${id}`)
    .then((response: AxiosResponse<MallWarehouseResponse>) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
      throw error;
    });
};

const getMallWarehouse = async (mallWarehouseQuery: MallWarehouseRequest): Promise<SearchMallWarehouseResponse> => {
  return axiosInstance
    .get('/mall-warehouses', { params: mallWarehouseQuery })
    .then((response: AxiosResponse<SearchMallWarehouseResponse>) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
};

const updateMallWarehouseApi = async (id: number, requestBody: EditMallWarehouseRequest): Promise<undefined> => {
  return axiosInstance
    .put(`/mall-warehouses/${id}`, requestBody)
    .then((response: AxiosResponse<undefined>) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
};

const deleteMallWarehouseApi = async (id: number): Promise<undefined> => {
  return axiosInstance
    .delete(`/mall-warehouses/${id}`)
    .then((response: AxiosResponse<undefined>) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
};

export {
  createMallWarehouseApi,
  getMallWarehouseApi,
  updateMallWarehouseApi,
  deleteMallWarehouseApi,
  getMallWarehouse,
  gethMallWarehouseById,
};
