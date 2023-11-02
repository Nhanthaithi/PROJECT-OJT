export interface ItemResponse {
  id: number;

  code: string;

  name: string;

  shopName: string;

  brandName: string;

  categoryName: string;

  mainStandardname: [string];

  subStandardname: [string];

  representativeItemImageUrl: [string];

  isDisplayed: boolean;

  type: string;
}
