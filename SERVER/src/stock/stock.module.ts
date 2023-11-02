import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MallWarehouse } from './entities/mall-warehouse.entity';
import { MallWarehouseController } from './controllers/mall-warehouse.controller';
import { MallWarehouseService } from './providers/mall-warehouse.service';
import { MallStock } from './entities/mall-stock.entity';
import { ShopStock } from './entities/shop-stock.entity';
import { ShopWarehouse } from './entities/shop-warehouse.entity';
import { StockNumberingEntity } from './entities/stock-numbering.entity';
import { WarehouseManagementNumbering } from './entities/warehouse-management-numbering.entity';
import { ShopWarehouseController } from './controllers/shop-warehouse.controller';
import { ShopWarehouseService } from './providers/shop-warehouse.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      MallStock,
      MallWarehouse,
      ShopStock,
      ShopWarehouse,
      StockNumberingEntity,
      WarehouseManagementNumbering,
    ]),
  ],
  controllers: [MallWarehouseController, ShopWarehouseController],
  providers: [MallWarehouseService, ShopWarehouseService],
})
export class StockModule {}
