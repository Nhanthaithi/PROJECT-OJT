import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsIn,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
} from 'class-validator';
export class SearchItemRequest {
  @IsOptional()
  @IsString()
  @MaxLength(16)
  name: string;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  code: string;

  @IsOptional()
  @IsNumber()
  @Transform((params) => Number(params.value.trim().split(/\s+/).join(' ')))
  shopId: number;

  @IsOptional()
  @IsNumber()
  @Transform((params) => Number(params.value.trim().split(/\s+/).join(' ')))
  brandId: number;

  @IsOptional()
  @IsNumber()
  @Transform((params) => Number(params.value.trim().split(/\s+/).join(' ')))
  categoryId: number;

  @IsOptional()
  @IsIn(['1', '0', true, false])
  hasMainImage: string | boolean;

  @IsOptional()
  isDeletedImage: boolean;

  @IsNumber()
  @Transform((params) => Number(params.value.trim().split(/\s+/).join(' ')))
  @Min(1)
  @Max(200)
  limit = 200;

  @Transform((params) => Number(params.value.trim().split(/\s+/).join(' ')))
  @IsNumber()
  @Min(1)
  page = 1;

  @IsOptional()
  @IsString()
  @IsIn(['name', 'brandName', 'categoryName', 'shopName'])
  orderBy: string;

  @IsOptional()
  @IsIn(['DESC'])
  sort = 'DESC';

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => {
    if (value === '1') return true;
    if (value === '0') return false;
    return value;
  })
  isDisplayed: boolean;
}
