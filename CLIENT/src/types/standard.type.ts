export interface StandardRequest {
  code?: string;
  name?: string;
  page: number;
  limit: number;
  sort: 'DESC' | 'ASC';
  orderBy: 'id' | 'code' | 'name' | 'label' | 'description' | 'createdAt' | 'createdBy' | 'modifiedAt' | 'modifiedBy';
}

export interface StandardSearchProps {
  setCode(str: string): void;
  setName(str: string): void;
  setCurrentPage(num: number): void;
}

export interface paginationSearchProps {
  currentPage: number;
  limit: number;
  setCurrentPage(num: number): void;
}
