export interface ShopWarehouseRequest {
  page?: number;

  limit: number;

  code?: string | '';

  shopId?: string | '';

  sort?: string | '';
}
