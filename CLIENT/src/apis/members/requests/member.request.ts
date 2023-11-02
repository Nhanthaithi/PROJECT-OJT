export interface MemberRequest {
  page?: number | undefined;

  limit?: number | undefined;

  sort?: string | undefined;

  memberNumber?: string | undefined;

  email?: string | undefined;

  phoneNumber?: string | undefined;

  name?: string | undefined;

  nameKana?: string | undefined;

  status?: number | undefined;
}
