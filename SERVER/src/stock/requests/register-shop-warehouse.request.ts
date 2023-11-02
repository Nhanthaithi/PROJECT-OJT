import {
  IsDefined,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  Length,
  Matches,
} from 'class-validator';
import { MallWarehouseStatus } from '../enums/mall-warehouse-status.enum';
import { Transform } from 'class-transformer';

export class RegisterRequest {
  @IsOptional()
  @IsDefined()
  name: string;

  @Transform((param) => Number(param.value))
  @IsInt()
  shopId: number;

  @IsOptional()
  code: string;

  @Length(1, 18)
  @IsNotEmpty()
  @IsDefined()
  @IsOptional()
  postalCode: string;

  @IsNotEmpty()
  @IsDefined()
  @Length(1, 2)
  @IsOptional()
  prefectureCode: string;

  @IsNotEmpty()
  @IsDefined()
  @IsOptional()
  @Length(1, 100)
  city: string;

  @IsNotEmpty()
  @IsDefined()
  @IsOptional()
  @Length(1, 200)
  address: string;

  @IsNotEmpty()
  @IsDefined()
  @IsEnum(MallWarehouseStatus)
  @IsOptional()
  status: number;

  @Length(10, 11)
  @IsOptional()
  @Matches(/^[0-9]+$/)
  phoneNumber: string;
}
