export interface CategoryByIdResponse {
  id?: number | undefined;

  code?: string | undefined;

  name?: string | undefined;

  level?: number | undefined;

  parentCategoryId?: number | undefined;

  parentCategoryName?: string | undefined;

  createdAt?: number | undefined;

  createdBy?: string | undefined;

  modifiedBy?: string | undefined;

  modifiedAt?: number | undefined;
}
