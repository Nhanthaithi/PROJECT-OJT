import { Transform } from 'class-transformer';
import {
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  Length,
  Matches,
  Max,
  MaxLength,
  Min,
} from 'class-validator';

export class StandardRequest {
  @IsOptional()
  @Length(4, 4)
  code: string;

  @IsOptional()
  @Length(1, 200)
  name: string;

  @IsNotEmpty()
  @Transform((parameter) => parseInt(parameter.value))
  @IsNumber()
  @Min(1)
  @Max(2147483647)
  page: number;

  @IsNotEmpty()
  @Transform((parameter) => parseInt(parameter.value))
  @IsNumber()
  @Min(1)
  @Max(200)
  limit: number;

  @IsIn(['ASC', 'DESC'])
  sort: string;

  @IsIn([
    'id',
    'code',
    'name',
    'label',
    'description',
    'createdAt',
    'createdBy',
    'modifiedAt',
    'modifiedBy',
  ])
  orderBy: string;
}

export class StandardBodyRequest {
  @Length(1, 200)
  name: string;

  @Length(1, 200)
  label: string;

  @Length(1, 1000)
  description: string;
}
export class CraeteStandardRequest {
  @IsNotEmpty()
  @Matches(/^\d{4}$/)
  code: string;

  @IsNotEmpty()
  @MaxLength(200)
  name: string;

  @IsNotEmpty()
  @MaxLength(200)
  label: string;

  @IsOptional()
  @IsNotEmpty()
  @MaxLength(1000)
  description: string;
}
