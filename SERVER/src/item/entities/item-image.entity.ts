import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import BitTransformer from 'src/transformers/bit.transformer';

import { ItemImageType } from '../enums/item-image-type.enum';
import { Classification } from './classification.entity';
import { Item } from './item.entity';
import { ItemImageUploadTask } from './item-image-upload-task.entity';

@Entity('item_image')
export class ItemImage {
  @PrimaryGeneratedColumn({ name: 'id', type: 'bigint' })
  id: number;

  @CreateDateColumn({ name: 'created_at', type: 'datetime', nullable: false })
  createdAt: Date;

  @Column({ name: 'created_by', type: 'varchar', length: 36, nullable: false })
  createdBy: string;

  @UpdateDateColumn({ name: 'modified_at', type: 'datetime', nullable: false })
  modifiedAt: Date;

  @Column({ name: 'modified_by', type: 'varchar', length: 36, nullable: false })
  modifiedBy: string;

  @Column({ name: 'type', type: 'int', nullable: false })
  type: ItemImageType;

  @Column({ name: 'item_id', type: 'bigint', nullable: false })
  itemId: number;

  @ManyToOne(() => Item, (item) => item.itemImages)
  @JoinColumn({ name: 'item_id' })
  item: Item;

  @Column({ name: 'classification_id', type: 'bigint', nullable: true })
  classificationId: number;

  @ManyToOne(
    () => Classification,
    (classification) => classification.itemImages,
  )
  @JoinColumn({ name: 'classification_id' })
  classification: Classification;

  @Column({
    name: 'item_image_upload_task_id',
    type: 'bigint',
    nullable: false,
  })
  itemImageUploadTaskId: number;

  @ManyToOne(
    () => ItemImageUploadTask,
    (item_image_upload_task) => item_image_upload_task.itemImages,
  )
  @JoinColumn({ name: 'item_image_upload_task_id' })
  itemImageUploadTask: ItemImageUploadTask;

  @Column({
    name: 'is_representative',
    type: 'bit',
    width: 1,
    default: false,
    nullable: false,
    transformer: new BitTransformer(),
  })
  isRepresentative: boolean;

  @Column({ name: 'object_uuid', type: 'varchar', length: 36, nullable: false })
  objectUuid: string;

  @Column({ name: 'extension', type: 'varchar', length: 10, nullable: false })
  extension: string;

  @Column({
    name: 'description',
    type: 'varchar',
    length: 1000,
    nullable: true,
  })
  description: string;

  @Column({
    name: 'is_deleted',
    type: 'bit',
    default: false,
    width: 1,
    nullable: false,
    transformer: new BitTransformer(),
  })
  isDeleted: boolean;
}
