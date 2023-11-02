import { Length, Matches } from 'class-validator';

export class DeleteCategoryRequest {
  @Matches(/^[1-9][0-9]*$/)
  @Length(1, 18)
  id: number;
}
