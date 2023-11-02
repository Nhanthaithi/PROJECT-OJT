export interface ItemRequest {
  name: string;

  code: string;

  shopId: number;

  brandId: number;

  categoryId: number;

  hasMainImage: string;

  isDeletedImage: boolean;

  orderBy: string;

  isDisplayed: boolean;

  page: number;

  limit: number;
}
