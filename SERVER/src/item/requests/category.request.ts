import {
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
  Validate,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'isParseIntString', async: false })
export class IsParseIntString implements ValidatorConstraintInterface {
  validate(value: string) {
    return /^\d+$/.test(value);
  }
  defaultMessage() {
    return 'Value must be a valid integer string';
  }
}

export class RequestGetList {
  @IsNotEmpty()
  @Matches(/^[a-zA-Z0-9]+$/)
  @Validate(IsParseIntString)
  page: number;

  @MinLength(1)
  @MaxLength(1000)
  @Matches(/^[a-zA-Z0-9]+$/)
  @Validate(IsParseIntString)
  limit: number;

  @IsString()
  @IsOptional()
  sort = 'ASC';
}
