import { MemberStatus } from '../../../types/member-status.enum';

export interface MemberResponse {
  id: number;

  memberNumber: string;

  name: string;

  nameKana: string;

  email: string;

  phoneNumber: string;

  postalCode: string;

  prefectureCode: string;

  city: string;

  address: string;

  status: MemberStatus;

  isBlacklisted: boolean;

  memo: string;

  createdAt: number;

  createdBy: string;

  modifiedAt: number;

  modifiedBy: string;
}
