export interface StandardRequest {
  code?: string;

  name?: string;

  label?: string;

  description?: string;

  createdBy?: string;

  modifiedBy?: string;

  page?: number | undefined;

  limit?: number | undefined;

  sort?: string;

  orderBy?: string;
}
