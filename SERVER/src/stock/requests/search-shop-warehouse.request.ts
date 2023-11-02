import { Transform } from 'class-transformer';
import { IsInt, IsOptional, Length, Matches, Min } from 'class-validator';

export class SearchRequest {
  @Matches(/^[1-9][0-9]*$/)
  @Length(1, 18)
  @IsOptional()
  shopId: number;

  @Transform((param) => param.value)
  @IsOptional()
  code: string;

  @Transform((parameter) => Number(parameter.value))
  @IsInt()
  @Min(1)
  @IsOptional()
  limit: number;

  @Transform((parameter) => Number(parameter.value))
  @IsInt()
  @Min(1)
  @IsOptional()
  page: number;
}
