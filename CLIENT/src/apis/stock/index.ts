import { AxiosResponse } from 'axios';
import axiosInstance from '../base.api';
import { ShopWarehouseResponse } from './response/ShopWarehouse.response';
import CreateShopWarehouseRequest from './requests/createShopWarehouse.request';
import EditWarehouseResponse from './response/editShopWarehouse.response';
import EditShopWarehouseRequest from './requests/editShopWarehouse.request';
import { ShopWarehouseRequest } from './mall-warehouse/requests/shopWarehouse.request';
const createShopWarehouseAPI = async (
  bodyRequest: CreateShopWarehouseRequest,
): Promise<{ data: ShopWarehouseResponse[] }> => {
  return axiosInstance
    .post('/shop-warehouses', bodyRequest)
    .then(
      (
        response: AxiosResponse<{
          data: ShopWarehouseResponse[];
          totalRecords: number;
          totalPage: number;
          limit: number;
        }>,
      ) => {
        return response.data;
      },
    )
    .catch((error) => {
      throw error;
    });
};

const getShopWarehouseAPI = async (
  shopWarehouseQuery?: ShopWarehouseRequest,
): Promise<{ data: ShopWarehouseResponse[]; totalRecords: number; totalPage: number; limit: number }> => {
  return axiosInstance
    .get('/shop-warehouses', { params: shopWarehouseQuery })
    .then(
      (
        response: AxiosResponse<{
          data: ShopWarehouseResponse[];
          totalRecords: number;
          totalPage: number;
          limit: number;
        }>,
      ) => {
        return response.data;
      },
    )
    .catch((error) => {
      throw error;
    });
};
const updateShopWarehouseAPI = async (
  id: number,
  bodyRequest: EditShopWarehouseRequest,
): Promise<{ data: EditWarehouseResponse[] }> => {
  return axiosInstance
    .put(`/shop-warehouses/${id}`, bodyRequest)
    .then(
      (
        response: AxiosResponse<{
          data: EditWarehouseResponse[];
        }>,
      ) => {
        return response.data;
      },
    )
    .catch((error) => {
      throw error;
    });
};
const getShopWarehouseById = async (
  shopWarehouseQuery?: ShopWarehouseRequest,
): Promise<{ data: ShopWarehouseResponse[] }> => {
  return axiosInstance
    .get('/shop-warehouses', { params: shopWarehouseQuery })
    .then((response: AxiosResponse<{ data: ShopWarehouseResponse[] }>) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
};
const deleteShopWarehouseAPI = async (id: number): Promise<{ message: string }> => {
  return axiosInstance
    .delete(`/shop-warehouses/${id}`)
    .then((response: AxiosResponse<{ message: 'delete successfully' }>) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
};

const getShopWarehouseId = async (id: number): Promise<ShopWarehouseResponse> => {
  return axiosInstance
    .get(`/shop-warehouses/${id}`)
    .then((response: AxiosResponse<ShopWarehouseResponse>) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
};
export {
  getShopWarehouseAPI,
  updateShopWarehouseAPI,
  getShopWarehouseById,
  deleteShopWarehouseAPI,
  getShopWarehouseId,
  createShopWarehouseAPI,
};
