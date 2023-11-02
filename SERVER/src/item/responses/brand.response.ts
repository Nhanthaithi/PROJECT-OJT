import { Brand } from '../entities/brand.entity';

export class SearchBrandResponse {
  data: BrandResponse[];

  totalPage: number;

  count: number;

  constructor(data: BrandResponse[], totalPage: number, count: number) {
    this.data = data;
    this.totalPage = totalPage;
    this.count = count;
  }
}

export class BrandResponse {
  id: number;

  code: string;

  name: string;

  constructor(brand: Brand) {
    this.id = brand.id;
    this.code = brand.code;
    this.name = brand.name;
  }
}
