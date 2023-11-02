import { MemberStatus } from '../../../types/member-status.enum';

export interface UpdateMemberRequest {
  status?: MemberStatus | string;

  isBlacklisted: boolean | string;

  memo?: string;
}
