import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CategoriesService } from '../providers/category.service';
import { UpdateRequest } from '../requests/category-update.request';
import { RequestGetList } from '../requests/category.request';
import { RegisterCategories } from '../requests/category-register.request';

@Controller('/categories')
export class CategoryController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  async getListCategories(@Query() query: RequestGetList) {
    return await this.categoriesService.getListCategories(
      query.page,
      query.limit,
      query.sort,
    );
  }

  @Get(':id')
  async getCategories(@Param('id', ParseIntPipe) id: number) {
    return await this.categoriesService.getCategories(id);
  }

  @Post()
  async registerCategories(@Body() body: RegisterCategories) {
    return this.categoriesService.register(body);
  }

  @Put(':id')
  async updateCategories(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateRequest,
  ) {
    return this.categoriesService.update(id, body);
  }

  @Delete('/:id')
  @HttpCode(204)
  async deleteCategory(@Param('id', ParseIntPipe) id: number) {
    return await this.categoriesService.delete(id);
  }
}
