import { IsNotEmpty, MaxLength } from 'class-validator';

export class UpdateRequest {
  @IsNotEmpty()
  @MaxLength(255)
  name: string;
}
