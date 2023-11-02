import {
  IsNotEmpty,
  MaxLength,
  MinLength,
  Matches,
  IsEnum,
  IsOptional,
} from 'class-validator';
import { MallWarehouseStatus } from '../enums/mall-warehouse-status.enum';

export class UpdateMallWarehouseRequest {
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(200)
  name: string;

  @IsNotEmpty()
  @MaxLength(8)
  @Matches(/^[0-9]{3}-[0-9]{4}$/)
  postalCode: string;

  @IsNotEmpty()
  @Matches(/^[0-9]{2}$/)
  prefectureCode: string;

  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(100)
  city: string;

  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(200)
  address: string;

  @IsOptional()
  phoneNumber: string;

  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(200)
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
