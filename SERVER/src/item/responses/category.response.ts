import { Category } from '../entities/category.entity';

export class ResponseGetList {
  id: number;
  code: string;
  level: number;
  parentCategoryId: number;
  name: string;

  constructor(category: Category) {
    this.id = category.id;
    this.code = category.code;
    this.level = category.level;
    this.name = category.name;
    this.parentCategoryId = category.parentCategoryId;
  }
}
