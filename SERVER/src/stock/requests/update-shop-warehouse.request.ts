import { IsOptional, MaxLength, MinLength } from 'class-validator';

export class UpdateRequest {
  @MinLength(1)
  @MaxLength(200)
  @IsOptional()
  name: string;

  @IsOptional()
  postalCode: string;

  @IsOptional()
  prefectureCode: string;

  @IsOptional()
  city: string;

  @IsOptional()
  address: string;

  @IsOptional()
  status: number;

  @IsOptional()
  phoneNumber: string;
}
