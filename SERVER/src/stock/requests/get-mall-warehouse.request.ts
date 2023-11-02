import { Transform } from 'class-transformer';
import { IsNotEmpty, Min, Max, IsInt, IsOptional, IsIn } from 'class-validator';

export class MallWarehouseRequest {
  @Transform(({ value }) => parseInt(value))
  @IsNotEmpty()
  @Min(1)
  @Max(2147483647)
  @IsInt()
  page: number;

  @Transform(({ value }) => parseInt(value))
  @IsInt()
  @Min(1)
  @Max(200)
  limit: number;

  @IsOptional()
  @IsIn(['DESC'])
  sort: 'DESC';

  @IsOptional()
  code: string;
}
