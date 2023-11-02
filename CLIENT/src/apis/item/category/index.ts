import { AxiosResponse } from 'axios';
import axiosInstance from '../../base.api';
import { CategoryRequest } from './requests/get-list-category.request';
import { CategoryResponse } from './responses/get-list-category.response';
import { CategoryByIdResponse } from './responses/get-category.response';
import { updateCategoryResponse } from './responses/update-category.response';
import { RegisterCategoryRequest } from './requests/register-category.request';
import { RegisterCategoryResponse } from './responses/register-category.response';

const getListCategory = async (categoryQuery: CategoryRequest): Promise<{ data: CategoryResponse[] }> => {
  return axiosInstance
    .get('/categories', { params: categoryQuery })
    .then((response: AxiosResponse<{ data: CategoryResponse[] }>) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
};

const getCategoryById = async (getCategoryQuery: number): Promise<CategoryByIdResponse> => {
  return axiosInstance
    .get(`/categories/${getCategoryQuery}`)
    .then((response: AxiosResponse<CategoryByIdResponse>) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
};

const createCategory = async (params: RegisterCategoryRequest): Promise<RegisterCategoryResponse> => {
  return axiosInstance
    .post('/categories', params)
    .then((response: AxiosResponse<RegisterCategoryResponse>) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
};

const updateCategory = async (id: number, name: string): Promise<updateCategoryResponse> => {
  return axiosInstance
    .put(`/categories/${id}`, { name })
    .then((response: AxiosResponse<updateCategoryResponse>) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
};

const deleteCategory = async (id: number) => {
  return axiosInstance
    .delete(`/categories/${id}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
};

export { getListCategory, getCategoryById, updateCategory, createCategory, deleteCategory };
