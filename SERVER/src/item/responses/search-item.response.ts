import itemRepresentativeImageUrl from 'src/config/item-representative-image-url.config';
import { Item } from '../entities/item.entity';
import { ItemType } from '../enums/item-type.enum';

const shops = [
  { id: 1, name: 'Shop 1' },
  { id: 2, name: 'Shop 2' },
  { id: 3, name: 'Shop 3' },
  { id: 4, name: 'Shop 4' },
  { id: 5, name: 'Shop 5' },
];
export class SearchItemResponse {
  id: number;

  code: string;

  name: string;

  shopName: string;

  brandName: string;

  categoryName: string;

  mainStandardname: string[] | string;

  subStandardname: string[] | string;

  representativeItemImageUrl: string[];

  isDisplayed: boolean;

  type: string;

  constructor(item: Item) {
    this.id = item.id;

    this.code = item.code;

    this.name = item.name;

    this.shopName = shops.find((shop) => shop.id == item.shopId)?.name;

    this.brandName = item.brand.name;

    this.categoryName = item.category.name;

    this.mainStandardname = item.itemStandards
      .filter((standard) => standard.isMain)
      .map((st) => st.standard?.name);

    this.subStandardname = item.itemStandards
      .filter((standard) => !standard.isMain)
      .map((st) => st.standard?.name);

    this.representativeItemImageUrl = item.itemImages
      .filter((img) => img.isRepresentative && !img.isDeleted)
      .map(
        (img) =>
          `${itemRepresentativeImageUrl}/${img.objectUuid}/${img.extension}`,
      );

    this.isDisplayed = item.isDisplayed;

    this.type = ItemType[item.type];
  }
}
