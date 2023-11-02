import {
  Controller,
  Get,
  Query,
  Delete,
  HttpCode,
  Param,
  ParseIntPipe,
  Body,
  Post,
  Put,
} from '@nestjs/common';
import { ShopWarehouseService } from '../providers/shop-warehouse.service';
import { UpdateRequest } from '../requests/update-shop-warehouse.request';
import { SearchRequest } from '../requests/search-shop-warehouse.request';
import { RegisterRequest } from '../requests/register-shop-warehouse.request';
import { InputParameterGetShopWarehouse } from '../requests/get-shop-warehouse.request';
@Controller('/shop-warehouses')
export class ShopWarehouseController {
  constructor(public shopWarehouseService: ShopWarehouseService) {}

  @Delete('/:id')
  @HttpCode(204)
  async deleteShopWarehouse(@Param('id', ParseIntPipe) id: number) {
    return await this.shopWarehouseService.delete(id);
  }
  @Put(':id')
  async updateShopwarehouse(
    @Body() body: UpdateRequest,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return await this.shopWarehouseService.update(body, id);
  }
  @Get()
  async searchShopwarehouse(@Query() param: SearchRequest) {
    return await this.shopWarehouseService.search(param);
  }
  @Get()
  async getAllShopWarehouses(@Query() param: InputParameterGetShopWarehouse) {
    return await this.shopWarehouseService.getAll(param);
  }
  @Post()
  async registerShopWarehouse(@Body() body: RegisterRequest) {
    return await this.shopWarehouseService.register(body);
  }
  @Get(':id')
  async searchShopWarehouseById(@Param('id', ParseIntPipe) id: number) {
    return await this.shopWarehouseService.searchById(id);
  }
}
