import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, In, Repository } from 'typeorm';
import { Category } from '../entities/category.entity';

import { UpdateRequest } from '../requests/category-update.request';
import { UpdateResponse } from '../responses/category-update.response';
import { ResponseGetList } from '../responses/category.response';
import { CategoryByIdResponse } from '../responses/category-by-id.response';
import { RegisterResponseCategories } from '../responses/category-register.response';
import { ItemNumbering } from '../entities/item-numbering.entity';
import { RegisterCategories } from '../requests/category-register.request';
import { Item } from '../entities/item.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    @InjectRepository(ItemNumbering)
    private itemNumberingRepository: Repository<ItemNumbering>,
    @InjectRepository(Item)
    private itemRepository: Repository<Item>,
  ) {}

  async getListCategories(
    page: number,
    limit: number,
    sort: string,
  ): Promise<{ data: ResponseGetList[] }> {
    const skip = (page - 1) * limit;
    const order = {};
    if (sort) {
      order[sort] = 'DESC';
    }
    const getAll = await this.categoryRepository.find();
    const totalPages = Math.ceil(getAll.length / limit);

    if (page && page > totalPages) {
      throw new BadRequestException();
    }

    const categories = await this.categoryRepository.find({
      where: { isDeleted: false },
      order: order,
      skip,
      take: limit,
      select: ['id', 'code', 'name', 'level', 'parentCategoryId'],
    });

    const categoryResponse: ResponseGetList[] = categories.map(
      (category) => new ResponseGetList(category),
    );

    return { data: categoryResponse };
  }

  async getCategories(id: number): Promise<CategoryByIdResponse> {
    const categoryChild = await this.categoryRepository.findOne({
      where: { id, isDeleted: false },
    });

    if (categoryChild) {
      const categoryParent = await this.categoryRepository.findOne({
        where: { id: categoryChild.parentCategoryId, isDeleted: false },
      });
      const response = new CategoryByIdResponse(categoryChild);
      response.parentCategoryName = categoryParent?.name
        ? categoryParent.name
        : null;
      return response;
    } else {
      throw new BadRequestException();
    }
  }

  async register(body: RegisterCategories) {
    let response: RegisterResponseCategories;

    if (body.parentCategoryId > 0) {
      const categoryParent = await this.categoryRepository.findOne({
        where: {
          id: body.parentCategoryId,
          level: In([1, 2]),
          isDeleted: false,
        },
      });
      if (!categoryParent) {
        throw new BadRequestException();
      }
      let serialCode = 0;
      let code = '';
      await this.itemNumberingRepository.manager.transaction(
        async (itemNumbering: EntityManager) => {
          const itemNumber = await itemNumbering
            .createQueryBuilder(ItemNumbering, 'item_numbering')
            .where({ prefix: `category_${body.parentCategoryId}` })
            .setLock('pessimistic_write')
            .getOne();
          if (!itemNumber) {
            const newItemNumbering = {
              number: 1,
              prefix: `category_${body.parentCategoryId}`,
              createdAt: new Date(),
              createdBy: 'HieuDB',
              modifiedAt: new Date(),
              modifiedBy: 'HieuDB',
            };
            const data = this.itemNumberingRepository.create(newItemNumbering);
            await itemNumbering.save(data);
          } else {
            itemNumber.number += 1;
            await itemNumbering.save(itemNumber);
          }
          serialCode = itemNumber?.number || 1;
          if (body.parentCategoryId == 0) {
            code = `${String(serialCode).padStart(3, '0')}000000`;
          } else if (categoryParent.level == 1) {
            code = `${categoryParent.code.slice(0, 3)}${String(
              serialCode,
            ).padStart(3, '0')}000`;
          } else if (categoryParent.level == 2) {
            code = `${categoryParent.code.slice(0, 6)}${String(
              serialCode,
            ).padStart(3, '0')}`;
          }
          const newData = {
            name: body.name,
            code: code,
            level: categoryParent.level == 1 ? 2 : 3,
            parentCategoryId: body.parentCategoryId,
            createdAt: new Date(),
            createdBy: 'HoangHieu',
            modifiedAt: new Date(),
            modifiedBy: 'HoangHieu',
          };
          const dataRegister = this.categoryRepository.create(newData);
          const result = await this.categoryRepository.save(dataRegister);
          response = new RegisterResponseCategories(
            result,
            categoryParent.name,
          );
        },
      );
    } else if (body.parentCategoryId == 0) {
      let serialCode = 0;
      let code = '';
      await this.itemNumberingRepository.manager.transaction(
        async (itemNumbering: EntityManager) => {
          const itemNumber = await itemNumbering
            .createQueryBuilder(ItemNumbering, 'item_numbering')
            .where({ prefix: `category_${body.parentCategoryId}` })
            .setLock('pessimistic_write')
            .getOne();
          if (!itemNumber) {
            const newItemNumbering = {
              number: 1,
              prefix: `category_${body.parentCategoryId}`,
              createdAt: new Date(),
              createdBy: 'HieuDB',
              modifiedAt: new Date(),
              modifiedBy: 'HieuDB',
            };
            const data = this.itemNumberingRepository.create(newItemNumbering);
            await itemNumbering.save(data);
          } else {
            itemNumber.number += 1;
            await itemNumbering.save(itemNumber);
          }
          serialCode = itemNumber?.number || 1;
          code = `${String(serialCode).padStart(3, '0')}000000`;
          const newData = {
            name: body.name,
            code: code,
            level: 1,
            parentCategoryId: 0,
            createdAt: new Date(),
            createdBy: 'HoangHieu',
            modifiedAt: new Date(),
            modifiedBy: 'HoangHieu',
          };
          const dataRegister = this.categoryRepository.create(newData);
          const result = await this.categoryRepository.save(dataRegister);
          response = new RegisterResponseCategories(result, '');
        },
      );
    }

    return response;
  }

  async update(id: number, body: UpdateRequest) {
    const data = await this.categoryRepository.findOne({
      where: { id: id, isDeleted: false },
    });

    if (!data) {
      throw new NotFoundException();
    }

    const parentCategory = await this.categoryRepository.findOne({
      where: { id: data.parentCategoryId, level: In([1, 2]), isDeleted: false },
    });
    await this.categoryRepository.update(id, body);
    const updatedCategory = await this.categoryRepository.findOne({
      where: { id: id },
    });
    const responseData = new UpdateResponse(updatedCategory);
    responseData.parentCategoryName = parentCategory?.name || null;

    return responseData;
  }

  async delete(id: number) {
    const category = await this.categoryRepository.findOne({
      where: { id: id, isDeleted: false },
    });

    if (!category) {
      throw new NotFoundException();
    }
    await this.categoryRepository.update({ id: id }, { isDeleted: true });

    const categoriesToUpdate = await this.categoryRepository.find({
      where: { parentCategoryId: id },
    });

    if (categoriesToUpdate.length > 0) {
      await this.categoryRepository.update(
        { parentCategoryId: id },
        { isDeleted: true },
      );
    }

    const updateItem = await this.itemRepository.find({
      where: {
        categoryId: id,
      },
    });
    if (updateItem.length > 0) {
      await this.itemRepository.update({ categoryId: id }, { isDeleted: true });
    }
  }
}
