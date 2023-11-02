export interface updateCategoryResponse {
  id: number;
  code: string;
  name?: string | undefined;
  level: number;
  parentCategoryId: number | null;
  parentCategoryName: string | null;
  createdAt: number;
  createdBy: string;
  modifiedBy: string;
  modifiedAt: number;
}
