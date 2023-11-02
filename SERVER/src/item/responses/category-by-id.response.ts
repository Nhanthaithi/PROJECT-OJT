import { Category } from '../entities/category.entity';

export class CategoryByIdResponse {
  id: number;
  code: string;
  name: string;
  level: number;
  parentCategoryId: number | null;
  parentCategoryName: string | null;
  createdAt: number;
  createdBy: string;
  modifiedBy: string;
  modifiedAt: number;

  constructor(category: Category) {
    this.id = category.id;
    this.code = category.code;
    this.name = category.name;
    this.level = category.level;
    this.parentCategoryId = category.parentCategoryId;
    this.createdAt = category.createdAt.getTime();
    this.createdBy = category.createdBy;
    this.modifiedBy = category.modifiedBy;
    this.modifiedAt = category.modifiedAt.getTime();
  }
}
