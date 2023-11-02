import { AxiosResponse } from 'axios';

import axiosInstance from '../base.api';
import { MemberResponse } from './responses/member.response';
import { UpdateMemberRequest } from './requests/update-member.request';

const getApi = async (id: number): Promise<MemberResponse> => {
  return axiosInstance
    .get(`/members/${id}`)
    .then((response: AxiosResponse<MemberResponse>) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
};

const updateApi = async (id: number, requestBody: UpdateMemberRequest): Promise<MemberResponse> => {
  return axiosInstance
    .put(`/members/${id}`, requestBody)
    .then((response: AxiosResponse<MemberResponse>) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
};

export { getApi, updateApi };
