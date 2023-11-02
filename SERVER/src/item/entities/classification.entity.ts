import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import BitTransformer from 'src/transformers/bit.transformer';

import { Standard } from './standard.entity';
import { SkuClassification } from './sku-classification.entity';
import { ItemImageUploadTask } from './item-image-upload-task.entity';
import { ItemImage } from './item-image.entity';

@Entity('classification')
@Unique('AK_classification_code', ['code'])
export class Classification {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ name: 'created_at', type: 'datetime', nullable: false })
  createdAt: Date;

  @Column({ name: 'created_by', type: 'varchar', length: 36, nullable: false })
  createdBy: string;

  @UpdateDateColumn({ name: 'modified_at', type: 'datetime', nullable: false })
  modifiedAt: Date;

  @Column({ name: 'modified_by', type: 'varchar', length: 36, nullable: false })
  modifiedBy: string;

  @Column({ name: 'code', type: 'char', length: 4, nullable: false })
  code: string;

  @Column({ name: 'name', type: 'varchar', length: 200, nullable: false })
  name: string;

  @Column({ name: 'standard_id', type: 'bigint', nullable: false })
  standardId: number;

  @Column({ name: 'description', type: 'varchar', nullable: true })
  description: string;

  @Column({
    name: 'is_deleted',
    type: 'bit',
    width: 1,
    default: false,
    nullable: false,
    transformer: new BitTransformer(),
  })
  isDeleted: boolean;

  //classification => standard
  @ManyToOne(() => Standard, (standard) => standard.classifications)
  @JoinColumn({ name: 'standard_id' })
  standard: Standard;

  //classification => sku_classification
  @OneToMany(
    () => SkuClassification,
    (skuClassifications) => skuClassifications.classification,
  )
  skuClassifications: SkuClassification[];

  //classification => item_image_upload_task
  @OneToMany(
    () => ItemImageUploadTask,
    (itemImageUploadTasks) => itemImageUploadTasks.classification,
  )
  itemImageUploadTasks: ItemImageUploadTask[];

  //classification => item_image
  @OneToMany(() => ItemImage, (itemImages) => itemImages.classification)
  itemImages: ItemImage[];
}
