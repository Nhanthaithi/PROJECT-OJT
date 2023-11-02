import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Brand } from './entities/brand.entity';
import { Category } from './entities/category.entity';
import { FileDownloadTask } from './entities/file-download-task.entity';
import { FileUploadTask } from './entities/file-upload-task.entity';
import { ItemNumbering } from './entities/item-numbering.entity';
import { ItemPreview } from './entities/item-preview.entity';
import { ItemStandard } from './entities/item-standard.entity';
import { ItemStandardPreview } from './entities/item-standard-preview.entity';
import { Item } from './entities/item.entity';
import { SkuClassification } from './entities/sku-classification.entity';
import { SkuClassificationPreview } from './entities/sku-classification-preview.entity';
import { SkuPreview } from './entities/sku-preview.entity';
import { Sku } from './entities/sku.entity';
import { Standard } from './entities/standard.entity';
import { Classification } from './entities/classification.entity';
import { ItemImageUploadTask } from './entities/item-image-upload-task.entity';
import { StandardController } from './controllers/standard.controller';
import { StandardService } from './providers/standard.service';
import { ItemImage } from './entities/item-image.entity';
import { BrandController } from './controllers/brand.controller';
import { BrandService } from './providers/brand.service';
import { ItemController } from './controllers/item.controller';
import { CategoryController } from './controllers/category.controller';
import { ItemService } from './providers/item.service';
import { CategoriesService } from './providers/category.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Brand,
      Category,
      Classification,
      FileDownloadTask,
      FileUploadTask,
      ItemImageUploadTask,
      ItemNumbering,
      ItemPreview,
      ItemStandard,
      ItemStandardPreview,
      Item,
      ItemImage,
      SkuClassification,
      SkuClassificationPreview,
      SkuPreview,
      Sku,
      Standard,
    ]),
  ],
  controllers: [
    BrandController,
    ItemController,
    CategoryController,
    StandardController,
  ],
  providers: [BrandService, ItemService, CategoriesService, StandardService],
})
export class ItemModule {}
