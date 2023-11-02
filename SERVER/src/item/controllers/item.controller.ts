import { Controller, Get, Query } from '@nestjs/common';

import { ItemService } from '../providers/item.service';
import { SearchItemRequest } from '../requests/search-item.request';

@Controller('items')
export class ItemController {
  constructor(private itemService: ItemService) {}

  @Get('search')
  async search(@Query() searchQuery: SearchItemRequest) {
    return await this.itemService.searchItem(searchQuery);
  }
}
