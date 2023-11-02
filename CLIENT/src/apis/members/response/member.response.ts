export interface MemberResponse {
  id: number;

  memberNumber: string;

  name: string;

  nameKana: string;

  email: string;

  phoneNumber: string;

  status: string;

  isBlacklisted: boolean;

  memo: string;
}

export interface SearchMemberResponse {
  data: MemberResponse[];

  totalPage: number;

  count: number;

  limit: number;
}
