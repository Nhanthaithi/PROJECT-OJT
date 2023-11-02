import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { Standard } from '../entities/standard.entity';
import { ItemStandard } from '../entities/item-standard.entity';
import { Classification } from '../entities/classification.entity';
import { StandardResponse } from '../responses/standard.responses';
import {
  CraeteStandardRequest,
  StandardBodyRequest,
  StandardRequest,
} from '../requests/standard.request';

@Injectable()
export class StandardService {
  constructor(
    @InjectRepository(Standard)
    private standardRepository: Repository<Standard>,
    @InjectRepository(ItemStandard)
    private itemStandardRepository: Repository<ItemStandard>,
    @InjectRepository(Classification)
    private classificationRepository: Repository<Classification>,
  ) {}
  async deleteStandard(idStandard: number): Promise<void> {
    return await this.standardRepository.manager.transaction(
      async (transactionalEntityManager: EntityManager) => {
        const standard = await transactionalEntityManager.findOne(Standard, {
          where: { id: idStandard, isDeleted: false },
          relations: ['itemStandards', 'classifications'],
        });
        if (!standard) {
          throw new NotFoundException();
        }
        if (standard.itemStandards && standard.itemStandards.length > 0) {
          throw new BadRequestException();
        }
        if (standard.classifications && standard.classifications.length > 0) {
          for (const item of standard.classifications) {
            item.isDeleted = true;
            await transactionalEntityManager.save(Classification, item);
          }
        }
        standard.isDeleted = true;
        await transactionalEntityManager.save(Standard, standard);
      },
    );
  }

  async editStandard(
    body: StandardBodyRequest,
    idStandard: number,
  ): Promise<StandardResponse> {
    const standard = await this.standardRepository.findOne({
      select: {
        id: true,
        code: true,
        name: true,
        label: true,
        description: true,
        createdAt: true,
        createdBy: true,
        modifiedAt: true,
        modifiedBy: true,
      },
      where: {
        id: idStandard,
        isDeleted: false,
      },
    });
    if (!standard) {
      throw new NotFoundException();
    }
    if (body.name) {
      standard.name = body.name;
    }
    if (body.label) {
      standard.label = body.label;
    }
    if (body.description) {
      standard.description = body.description;
    }
    const editStandart = await this.standardRepository.save(standard);
    if (!editStandart) {
      throw new NotFoundException();
    }
    return new StandardResponse(editStandart);
  }

  async createStandard(
    param: CraeteStandardRequest,
  ): Promise<StandardResponse> {
    const standard = await this.standardRepository.findOne({
      where: { code: param.code },
    });
    if (standard) {
      throw new BadRequestException();
    }
    const newStandard = await this.standardRepository.save({...param,createdBy:'admin',modifiedBy:'admin'});

    return new StandardResponse(newStandard);
  }

  async searchStandard(param: StandardRequest): Promise<{
    data: StandardResponse[];
    totalRecord: number;
    skip: number;
    totalPage: number;
  }> {
    const order: object = {};
    const skip: number = (Number(param.page) - 1) * Number(param.limit);
    if (param.sort) {
      order[param.orderBy] = param.sort;
    }
    const [standards, totalRecord] = await this.standardRepository.findAndCount(
      {
        select: {
          id: true,
          code: true,
          name: true,
          label: true,
        },
        where: {
          code: param.code,
          name: param.name,
          isDeleted: false,
        },
        order: order,
        skip: skip,
        take: param.limit,
      },
    );
    const totalPage = Math.ceil(totalRecord / Number(param.limit));
    const data = [];
    for (const standard of standards) {
      const response = new StandardResponse(standard);
      data.push(response);
    }
    return { data, totalRecord, skip, totalPage };
  }

  async getStandard(idStandard: number): Promise<StandardResponse> {
    const standard = await this.standardRepository.findOne({
      select: {
        id: true,
        code: true,
        name: true,
        label: true,
        description: true,
        createdAt: true,
        createdBy: true,
        modifiedAt: true,
        modifiedBy: true,
      },
      where: {
        id: idStandard,
        isDeleted: false,
      },
    });
    if (!standard) {
      throw new NotFoundException();
    }
    return new StandardResponse(standard);
  }
}
