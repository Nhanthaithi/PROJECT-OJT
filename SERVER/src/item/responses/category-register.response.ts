import { Category } from 'src/item/entities/category.entity';

export class RegisterResponseCategories {
  id: number;
  name: string;
  code: string;
  level: number;
  parentCategoryId: number;
  parentCategoryName: string;
  createdBy: string;
  modifiedBy: string;

  constructor(category: Category, name: string) {
    this.id = category.id;
    this.name = category.name;
    this.code = category.code;
    this.level = category.level;
    this.parentCategoryId = category.parentCategoryId;
    this.parentCategoryName = name;
    this.createdBy = category.createdBy;
    this.modifiedBy = category.modifiedBy;
  }
}
