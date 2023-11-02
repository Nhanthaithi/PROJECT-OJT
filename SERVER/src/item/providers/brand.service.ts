import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Brand } from '../entities/brand.entity';
import { SearchBrandRequest } from '../requests/search-brand.request';
import {
  SearchBrandResponse,
  BrandResponse,
} from '../responses/brand.response';

@Injectable()
export class BrandService {
  constructor(
    @InjectRepository(Brand)
    private brandRepository: Repository<Brand>,
  ) {}

  async search(query: SearchBrandRequest): Promise<SearchBrandResponse> {
    const { page = 1, limit = 3, name } = query;
    const queryCondition = { name: Like(`%${name || ''}%`), isDeleted: false };
    const perPage = limit;
    const skip = (page - 1) * perPage;

    const [brands, count] = await this.brandRepository.findAndCount({
      where: queryCondition,
      order: {
        createdAt: 'DESC',
      },
      select: ['id', 'code', 'name'],
      take: limit,
      skip: skip,
    });
    const totalPage = Math.ceil(count / perPage);

    if (page > totalPage) {
      throw new BadRequestException();
    }

    const brandsResponse: BrandResponse[] = brands.map(
      (brand) => new BrandResponse(brand),
    );

    return new SearchBrandResponse(brandsResponse, totalPage, count);
  }
}
