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
import { StandardService } from '../providers/standard.service';
import {
  CraeteStandardRequest,
  StandardBodyRequest,
  StandardRequest,
} from '../requests/standard.request';

@Controller('/standards')
export class StandardController {
  constructor(public standardService: StandardService) {}
  @Delete('/:id')
  @HttpCode(204)
  deleteStandard(@Param('id', ParseIntPipe) idStandard: number) {
    return this.standardService.deleteStandard(idStandard);
  }
  @Put('/:id')
  async editStandard(
    @Body() body: StandardBodyRequest,
    @Param('id', ParseIntPipe) idStandard: number,
  ) {
    return await this.standardService.editStandard(body, idStandard);
  }
  @Post()
  createStandard(@Body() body: CraeteStandardRequest) {
    return this.standardService.createStandard(body);
  }
  @Get()
  searchStandard(@Query() query: StandardRequest) {
    return this.standardService.searchStandard(query);
  }
  @Get('/:id')
  getStandard(@Param('id', ParseIntPipe) idStandard: number) {
    return this.standardService.getStandard(idStandard);
  }
}
