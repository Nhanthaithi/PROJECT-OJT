import axiosInstance from '../base.api';
import { MemberRequest } from './requests/member.request';
import { SearchMemberResponse } from './response/member.response';

export class MemberAPI {
  static async search(params: MemberRequest): Promise<SearchMemberResponse> {
    const url: string = '/members';
    try {
      const response = await axiosInstance.get(url, { params });
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
