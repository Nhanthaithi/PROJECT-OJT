import { Transform } from 'class-transformer';
import {
  IsPositive,
  NotEquals,
  IsIn,
  Min,
  Max,
  IsOptional,
} from 'class-validator';

export class SearchBrandRequest {
  @Transform((params) => Number(params.value.trim().split(/\s+/).join(' ')))
  @IsPositive()
  @NotEquals(0)
  page = 1;

  @Transform((params) => Number(params.value.trim().split(/\s+/).join(' ')))
  @NotEquals(0)
  @Min(1)
  @Max(1000)
  limit = 3;

  @IsIn(['DESC'])
  sort = 'DESC';

  @IsOptional()
  name: string;
}
