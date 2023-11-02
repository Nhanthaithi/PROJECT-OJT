import { Transform } from 'class-transformer';
import {
  Max,
  IsInt,
  Min,
  Matches,
  Length,
  MinLength,
  MaxLength,
  IsEnum,
  IsOptional,
  IsIn,
} from 'class-validator';
import { MemberStatus } from '../enums/member-status.enum';

export class MemberSearchRequest {
  @Transform((parameter) => parseInt(parameter.value))
  @IsInt()
  @Min(1)
  @Max(2147483647)
  page: number;

  @Transform((parameter) => parseInt(parameter.value))
  @IsInt()
  @Min(1)
  @Max(1002)
  limit: number;

  @IsIn(['ASC', 'DESC'])
  sort: string;

  @IsOptional()
  @Matches(/^[0-9]+$/)
  @Length(8, 8)
  memberNumber: string;

  @IsOptional()
  @MinLength(5)
  @MaxLength(320)
  email: string;

  @IsOptional()
  @Matches(/^[0-9]+$/)
  @MinLength(10)
  @MaxLength(11)
  phoneNumber: string;

  @IsOptional()
  @MaxLength(255)
  name: string;

  @IsOptional()
  @MaxLength(255)
  nameKana: string;

  @IsOptional()
  @Transform((parameter) => parseInt(parameter.value))
  @IsEnum(MemberStatus)
  status: number;
}
