import { Controller, Get, Query } from '@nestjs/common';
import { BrandService } from '../providers/brand.service';
import { SearchBrandRequest } from '../requests/search-brand.request';

@Controller()
export class BrandController {
  constructor(private brandService: BrandService) {}

  @Get('/brands')
  async handleSearch(@Query() query: SearchBrandRequest) {
    return await this.brandService.search(query);
  }
}
