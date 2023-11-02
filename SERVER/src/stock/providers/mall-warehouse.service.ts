import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MallWarehouse } from '../entities/mall-warehouse.entity';
import { MallWarehouseStatus } from '../enums/mall-warehouse-status.enum';
import { ErrorCode } from '../../filters/enums/error-code';
import { EntityManager, Repository } from 'typeorm';
import { UpdateMallWarehouseRequest } from '../requests/update-mall-warehouse.request';
import { CreateMallWarehouseRequest } from '../requests/create-mall-warehouse.request';
import { WarehouseManagementNumbering } from '../entities/warehouse-management-numbering.entity';
import {
  MallWarehouseResponse,
  MallWarehouseResponses,
} from '../responses/mall-warehouse.response';

@Injectable()
export class MallWarehouseService {
  constructor(
    @InjectRepository(MallWarehouse)
    private mallWarehouseRepository: Repository<MallWarehouse>,
    @InjectRepository(WarehouseManagementNumbering)
    private warehouseManagementNumberingRepository: Repository<WarehouseManagementNumbering>,
  ) {}

  async getMallWarehouse(
    page: number,
    limit: number,
    code: string,
  ): Promise<MallWarehouseResponses> {
    const [mallWarehouses, totalRecords] =
      await this.mallWarehouseRepository.findAndCount({
        where: {
          isDeleted: false,
          code,
        },
        order: {
          name: 'DESC',
        },
        skip: (page - 1) * limit,
        take: limit,
      });

    const mallWarehousesResponse: MallWarehouseResponse[] = [];

    for (const mallWarehouse of mallWarehouses as MallWarehouse[]) {
      const response: MallWarehouseResponse = new MallWarehouseResponse(
        mallWarehouse,
      );
      mallWarehousesResponse.push(response);
    }

    const pageTotal = Math.ceil(totalRecords / limit);

    return new MallWarehouseResponses(
      mallWarehousesResponse,
      totalRecords,
      limit,
      pageTotal,
    );
  }

  async deleteMallWarehouse(id: number) {
    const mallWarehouse = await this.mallWarehouseRepository.findOne({
      where: {
        id: id,
        isDeleted: false,
      },
    });

    if (!mallWarehouse) {
      throw new NotFoundException();
    }

    if (mallWarehouse.status === MallWarehouseStatus.ACTIVE) {
      throw new BadRequestException(ErrorCode.E405002);
    }

    mallWarehouse.isDeleted = true;
    await this.mallWarehouseRepository.save(mallWarehouse);
  }

  async create(body: CreateMallWarehouseRequest) {
    if (body.phoneNumber && !/^[0-9]{10,11}$/.test(body.phoneNumber)) {
      throw new BadRequestException();
    }

    const dataMall = {
      createdAt: new Date(),
      createdBy: 'khoatd',
      modifiedAt: new Date(),
      modifiedBy: 'nhantt',
    };

    const createCode = (number: number) => {
      return `20220000` + `${number}`.padStart(3, '0');
    };

    const convertStatus = (status: string) => {
      if (status === 'ACTIVE') {
        return 1;
      } else if (status === 'STOP') {
        return 2;
      }
    };

    await this.warehouseManagementNumberingRepository.manager.transaction(
      async (entityManager: EntityManager) => {
        const warehouseNumberEntity = await entityManager
          .createQueryBuilder(WarehouseManagementNumbering, 'mall_numbering')
          .where({ prefix: 'mall_warehouse' })
          .setLock('pessimistic_write')
          .getOne();

        if (!warehouseNumberEntity) {
          const newData = {
            ...dataMall,
            prefix: 'mall_warehouse',
            number: 1,
          };
          const shopWarehouseEntity =
            this.warehouseManagementNumberingRepository.create(newData);
          await entityManager.save(shopWarehouseEntity);

          const createSeriMall = 1;

          const createcode = createCode(createSeriMall);

          const dataConvert = convertStatus(body.status);

          const dataMall1 = {
            ...dataMall,
            ...body,
            code: createcode,
            status: dataConvert,
          };

          const createMallWarehouse =
            this.mallWarehouseRepository.create(dataMall1);
          return await this.mallWarehouseRepository.save(createMallWarehouse);
        } else if (warehouseNumberEntity?.prefix === 'mall_warehouse') {
          const dataUpdateNumbering = (warehouseNumberEntity.number += 1);
          await entityManager.save(warehouseNumberEntity);

          const createcode = createCode(dataUpdateNumbering);

          const dataConvert = convertStatus(body.status);

          const dataMall1 = {
            ...dataMall,
            ...body,
            code: createcode,
            status: dataConvert,
          };
          const createMallWarehouse =
            this.mallWarehouseRepository.create(dataMall1);
          return await this.mallWarehouseRepository.save(createMallWarehouse);
        }
      },
    );
  }

  async edit(id: number, body: UpdateMallWarehouseRequest) {
    if (body.phoneNumber && !/^[0-9]{10,11}$/.test(body.phoneNumber)) {
      throw new BadRequestException();
    }
    const data = await this.mallWarehouseRepository.findOne({
      where: { id },
    });

    if (!data) {
      throw new NotFoundException();
    }

    const convertStatus = (status: string) => {
      if (status === 'ACTIVE') {
        return 1;
      } else if (status === 'STOP') {
        return 2;
      }
    };
    const dataConvert = convertStatus(body.status);
    const dataRequets = {
      ...body,
      status: dataConvert,
    };

    await this.mallWarehouseRepository.update({ id }, dataRequets);
  }

  async getId(id: number): Promise<MallWarehouseResponse> {
    const mallWarehouse: MallWarehouse =
      await this.mallWarehouseRepository.findOne({
        where: {
          id: id,
          isDeleted: false,
        },
      });

    if (!mallWarehouse) {
      throw new NotFoundException();
    }

    return new MallWarehouseResponse(mallWarehouse);
  }
}
