import { Injectable, NotFoundException } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';

import { Item } from '../entities/item.entity';

import { Repository } from 'typeorm';

import { SearchItemRequest } from '../requests/search-item.request';
import { SearchItemResponse } from '../responses/search-item.response';

@Injectable()
export class ItemService {
  constructor(
    @InjectRepository(Item) private itemRepository: Repository<Item>,
  ) {}

  async searchItem(searchItemQuery: SearchItemRequest): Promise<{
    data: SearchItemResponse[];
    totalPage: number;
    count: number;
    limit: number;
  }> {
    const {
      name,
      code,
      shopId,
      brandId,
      categoryId,
      hasMainImage,
      page = 1,
      limit = 200,
      orderBy,
      sort = 'DESC',
      isDisplayed,
    } = searchItemQuery;

    const orderCriteria = {};
    switch (orderBy) {
      case 'brandName':
        orderCriteria['brand.name'] = sort.toUpperCase();
        break;
      case 'categoryName':
        orderCriteria['category.name'] = sort.toUpperCase();
        break;
      case 'name':
        orderCriteria['item.name'] = sort.toUpperCase();
        break;
      default:
        break;
    }

    const query = this.itemRepository
      .createQueryBuilder('item')
      .innerJoinAndSelect('item.brand', 'brand')
      .innerJoinAndSelect('item.category', 'category')
      .leftJoinAndSelect('item.itemStandards', 'itemStandards')
      .leftJoinAndSelect('itemStandards.standard', 'standard')
      .leftJoinAndSelect('item.itemImages', 'itemImages')
      .where('item.isDeleted = :isDeleted', { isDeleted: false });

    if (name) {
      query.andWhere('LOWER(item.name) LIKE LOWER(:name)', {
        name: `%${name}%`,
      });
    }

    if (code) {
      query.andWhere('LOWER(item.code) LIKE LOWER(:code)', {
        code: `%${code}%`,
      });
    }

    if (shopId) {
      query.andWhere('item.shopId = :shopId', { shopId });
    }

    if (brandId) {
      query.andWhere('item.brandId = :brandId', { brandId });
    }

    if (categoryId) {
      query.andWhere('item.categoryId = :categoryId', { categoryId });
    }

    if (hasMainImage === '1') {
      query.innerJoin(
        'item.itemImages',
        'mainImage',
        'mainImage.isRepresentative = :hasMainImage AND mainImage.isDeleted = :isDeletedImage',
        { hasMainImage: true, isDeletedImage: false },
      );
    } else if (hasMainImage && hasMainImage === '0') {
      query.innerJoin(
        'item.itemImages',
        'noMainImage',
        'noMainImage.isRepresentative = :hasMainImage',
        { hasMainImage: false },
      );
    }

    if (isDisplayed) {
      query.andWhere('item.isDisplayed = :isDisplayed', { isDisplayed });
    }

    query.orderBy(orderCriteria);
    query.take(limit);
    query.skip((page - 1) * limit);

    const [result, count] = await query.getManyAndCount();
    console.log(count, result, 'count');
    const totalPage = Math.ceil(count / limit);

    if (result.length > 0 && count > 0) {
      if (page > totalPage) {
        throw new NotFoundException();
      }
      const newItemResponse = result.map((item) => {
        return new SearchItemResponse(item);
      });
      return { data: newItemResponse, totalPage, count, limit };
    }
    return { data: [], totalPage, count, limit };
  }
}
