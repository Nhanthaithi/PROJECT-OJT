import {
  Controller,
  Put,
  Body,
  Param,
  ParseIntPipe,
  Get,
  Post,
  HttpCode,
  Delete,
  Query,
} from '@nestjs/common';
import { MallWarehouseRequest } from '../requests/get-mall-warehouse.request';
import { MallWarehouseService } from '../providers/mall-warehouse.service';
import { UpdateMallWarehouseRequest } from '../requests/update-mall-warehouse.request';
import { CreateMallWarehouseRequest } from '../requests/create-mall-warehouse.request';

@Controller('/mall-warehouses')
export class MallWarehouseController {
  constructor(private mallWarehouseService: MallWarehouseService) {}

  @Get()
  async getMallWarehouse(@Query() query: MallWarehouseRequest) {
    const { page, limit, code } = query;
    return this.mallWarehouseService.getMallWarehouse(page, limit, code);
  }

  @Put('/:id')
  async handleEditMall(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateMallWarehouseRequest,
  ) {
    return await this.mallWarehouseService.edit(id, body);
  }

  @Post()
  @HttpCode(200)
  async handleRegisterMall(@Body() body: CreateMallWarehouseRequest) {
    return await this.mallWarehouseService.create(body);
  }

  @Get('/:id')
  async getId(@Param('id', ParseIntPipe) id: number) {
    return this.mallWarehouseService.getId(id);
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteById(@Param('id', ParseIntPipe) id: number) {
    return await this.mallWarehouseService.deleteMallWarehouse(id);
  }
}
