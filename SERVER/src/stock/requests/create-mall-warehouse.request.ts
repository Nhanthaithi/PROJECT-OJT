import {
  IsNotEmpty,
  MaxLength,
  MinLength,
  Matches,
  IsEnum,
  IsOptional,
} from 'class-validator';

import { MallWarehouseStatus } from '../enums/mall-warehouse-status.enum';

export class CreateMallWarehouseRequest {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @Matches(/^[0-9]{3}-[0-9]{4}$/)
  @MaxLength(8)
  postalCode: string;

  @IsNotEmpty()
  @Matches(/^[0-9]{2}$/)
  prefectureCode: string;

  @IsNotEmpty()
  @MaxLength(100)
  @MinLength(1)
  city: string;

  @IsNotEmpty()
  @MaxLength(200)
  @MinLength(1)
  address: string;

  @IsOptional()
  phoneNumber: string;

  @IsNotEmpty()
  @MaxLength(200)
  @MinLength(1)
  operatingCompanyName: string;

  @IsNotEmpty()
  @Matches(/^[0-9]{10,11}$/)
  operatingCompanyPhoneNumber: string;

  @IsNotEmpty()
  @Matches(/^[0-9]{1,20}$/)
  senddingStoreCode: string;

  @IsNotEmpty()
  @IsEnum(MallWarehouseStatus)
  status: string;
}
