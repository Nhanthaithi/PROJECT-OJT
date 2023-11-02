import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ShopWarehouse } from '../entities/shop-warehouse.entity';
import { EntityManager, In, Repository } from 'typeorm';
import { ShopStock } from '../entities/shop-stock.entity';
import { ShopWarehouseGetAllResponse } from '../responses/get-shop-warehouse.responses';
import { InputParameterGetShopWarehouse } from '../requests/get-shop-warehouse.request';
import { UpdateResponse } from '../responses/update-shop-warehouse.responses';
import { shopIdList } from '../enums/shop-id-list.constain';
import { UpdateRequest } from '../requests/update-shop-warehouse.request';
import { SearchRequest } from '../requests/search-shop-warehouse.request';
import { StockNumberingEntity } from '../entities/stock-numbering.entity';
import { ShopWarehouseResponse } from '../responses/register-shop-warehouse.response';
import { RegisterRequest } from '../requests/register-shop-warehouse.request';
@Injectable()
export class ShopWarehouseService {
  constructor(
    @InjectRepository(ShopWarehouse)
    private shopWarehouseRepository: Repository<ShopWarehouse>,
    @InjectRepository(ShopStock)
    private shopStockRepository: Repository<ShopStock>,
    @InjectRepository(StockNumberingEntity)
    private stockNumberingRepository: Repository<StockNumberingEntity>,
  ) {}
  // get shopwarehouse
  async getAll(param: InputParameterGetShopWarehouse): Promise<{
    data: ShopWarehouseGetAllResponse[];
    totalRecords: number;
    totalPage: number;
    limit: number;
  }> {
    const { limit, page } = param;
    const shopIds = shopIdList.map((shop) => shop.id);
    const order = {};
    if (param.sort) {
      order[param.sort] = 'DESC';
    }
    const skip = (page - 1) * limit > 0 && (page - 1) * limit;
    const data = await this.shopWarehouseRepository.find({
      where: {
        isDeleted: false,
        shopId: In(shopIds),
      },
      order: order,
      skip: skip,
      take: param.limit,
    });
    const getAll = await this.shopWarehouseRepository.find({
      where: { isDeleted: false, shopId: In(shopIds) },
    });
    // validate page
    const pageTotal = Math.ceil(getAll.length / limit);
    if ((page && page < 1) || page > pageTotal) {
      throw new BadRequestException();
    }
    if (data.length > 0) {
      const newData = data.map((shopWarehouse) => {
        return new ShopWarehouseGetAllResponse(shopWarehouse);
      });
      return {
        data: newData,
        totalRecords: getAll.length,
        totalPage: pageTotal,
        limit: param.limit,
      };
    }
    throw new NotFoundException();
  }
  //TO DO
  async register(body: RegisterRequest) {
    const shop = shopIdList.find((item) => item.id === body.shopId);
    if (!shop) {
      throw new BadRequestException();
    }
    let serialCode = 0;
    try {
      return await this.stockNumberingRepository.manager.transaction(
        async (stockNumbering: EntityManager) => {
          const stockNumber = await stockNumbering
            .createQueryBuilder(StockNumberingEntity, 'stock_numbering')
            .where({ prefix: `shop_warehouse_${shop.id}` })
            .setLock('pessimistic_write')
            .getOne();
          if (!stockNumber) {
            const newStock = {
              number: 1,
              prefix: `shop_warehouse_${shop.id}`,
              createdAt: new Date(),
              createdBy: 'Xuyen',
              modifiedAt: new Date(),
              modifiedBy: 'XuyenTN',
            };
            const data = this.stockNumberingRepository.create(newStock);
            await stockNumbering.save(data);
          } else {
            stockNumber.number += 1;
            await stockNumbering.save(stockNumber);
          }
          serialCode = stockNumber?.number || 1;
          const codeShopWarehouse = `${shop.code}${String(serialCode).padStart(
            3,
            '0',
          )}`;
          body.code = codeShopWarehouse;
          const dataRegister = this.shopWarehouseRepository.create(body);
          const result = await this.shopWarehouseRepository.save(dataRegister);
          return new ShopWarehouseResponse(result);
        },
      );
    } catch (error) {
      throw new ConflictException('Duplicate entry');
    }
  }
  async search(param: SearchRequest) {
    const { code, shopId, limit, page } = param;
    const skip = (page - 1) * limit > 0 && (page - 1) * limit;
    //TO DO
    const validShopIds = shopIdList.find((shop) => shop.id);
    if (!validShopIds) {
      throw new NotFoundException();
    }
    let whereClause: { code?: string; shopId?: number; isDeleted: boolean } = {
      isDeleted: false,
    };
    if (code && shopId) {
      whereClause = {
        ...whereClause,
        code: code,
        shopId: shopId,
      };
    }

    const [getList, totalRecords] =
      await this.shopWarehouseRepository.findAndCount({
        where: whereClause,
        skip: skip,
        take: limit,
      });
    const pageTotal = Math.ceil(totalRecords / limit);

    if ((page && page < 1) || page > pageTotal) {
      throw new BadRequestException();
    }
    if (getList.length > 0) {
      const data = getList.map((item) => new ShopWarehouseResponse(item));
      return {
        data,
        totalRecords: totalRecords,
        totalPage: pageTotal,
        limit: param.limit,
      };
    }
  }
  async delete(id: number) {
    // TO DO
    const shopIds = shopIdList.map((shop) => shop.id);
    const shopWarehouses = await this.shopWarehouseRepository.find({
      where: {
        id: Number(id),
        isDeleted: false,
        shopId: In(shopIds),
      },
      relations: ['shopStocks'],
    });
    if (!shopWarehouses || shopWarehouses.length === 0) {
      throw new NotFoundException();
    }
    for (const shopWarehouse of shopWarehouses) {
      shopWarehouse.isDeleted = true;
      shopWarehouse.shopStocks.map((shopStock) => (shopStock.isDeleted = true));
      await this.shopWarehouseRepository.save(shopWarehouse);
      await this.shopStockRepository.save(shopWarehouse.shopStocks);
    }
    return;
  }
  async update(body: UpdateRequest, id: number) {
    // TO DO
    const shopIds = shopIdList.map((shop) => shop.id);
    const data = await this.shopWarehouseRepository.find({
      where: {
        id: id,
        shopId: In(shopIds),
        isDeleted: false,
      },
    });
    if (!data) {
      throw new BadRequestException();
    }
    await this.shopWarehouseRepository.update(id, body);
    const updatedData = await this.shopWarehouseRepository.findOne({
      where: { id },
    });
    return new UpdateResponse(updatedData);
  }
  async searchById(id: number) {
    const data = await this.shopWarehouseRepository.findOne({
      where: { id },
    });
    if (!data) {
      throw new BadRequestException();
    }
    return new ShopWarehouseGetAllResponse(data);
  }
}
