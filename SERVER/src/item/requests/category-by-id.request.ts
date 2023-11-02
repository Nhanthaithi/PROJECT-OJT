import { Transform } from 'class-transformer';
import { IsNumber, Min } from 'class-validator';

export class CategoryByIdRequest {
  @IsNumber()
  @Transform((params) => Number(params.value.trim().split(/\s+/).join(' ')))
  @Min(1)
  id: number;
}
