import { IsInt, IsOptional, Min } from 'class-validator';
import { Transform } from 'class-transformer';
export class InputParameterGetShopWarehouse {
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

  @IsOptional()
  sort: string;
}
