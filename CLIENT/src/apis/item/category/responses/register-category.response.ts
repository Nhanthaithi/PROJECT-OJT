export interface RegisterCategoryResponse {
  id: number;
  name: string;
  code: string;
  level: number;
  parentCategoryId: number;
  parentCategoryName: string;
  createdBy: string;
  modifiedBy: string;
}
