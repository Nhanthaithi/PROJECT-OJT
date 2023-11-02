import { IsBoolean, IsEnum, IsOptional } from 'class-validator';
import { MemberStatus } from '../enums/member-status.enum';
import { Transform } from 'class-transformer';

export class UpdateMemberRequest {
  @Transform((status) => parseInt(status.value))
  @IsEnum(MemberStatus)
  status: MemberStatus;

  @IsBoolean()
  isBlacklisted: boolean;

  @IsOptional()
  memo: string;
}
