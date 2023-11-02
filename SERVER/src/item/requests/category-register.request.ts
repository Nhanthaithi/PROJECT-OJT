import { BadRequestException } from '@nestjs/common';
import {
  IsDefined,
  IsNotEmpty,
  IsString,
  Length,
  Validate,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'isParseIntString', async: false })
export class IsParseIntString implements ValidatorConstraintInterface {
  validate(value: string) {
    if (!/^\d+$/.test(value)) {
      throw new BadRequestException();
    }
    return true;
  }
}

export class RegisterCategories {
  @IsNotEmpty()
  @Length(0, 200)
  @IsString()
  name: string;

  @IsDefined()
  @IsNotEmpty()
  @Length(1, 18)
  @Validate(IsParseIntString)
  parentCategoryId: number;
}
