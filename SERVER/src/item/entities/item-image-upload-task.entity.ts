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
import { ItemImageUploadTaskStatus } from '../enums/item-image-upload-task.enum';
import { Item } from './item.entity';
import { Classification } from './classification.entity';
import { ItemImage } from './item-image.entity';

@Entity('item_image_upload_task')
@Unique('AK_item_image_upload_task_object_uuid', ['objectUuid'])
export class ItemImageUploadTask {
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

  @Column({ name: 'shop_id', type: 'bigint', nullable: false })
  shopId: number;

  @Column({ name: 'item_id', type: 'bigint', nullable: false })
  itemId: number;

  @Column({
    name: 'classification_id',
    type: 'bigint',
    nullable: true,
  })
  classificationId: number;

  @Column({ name: 'status', nullable: false })
  status: ItemImageUploadTaskStatus;

  @Column({
    name: 'file_name',
    type: 'varchar',
    length: 200,
    nullable: false,
  })
  fileName: string;

  @Column({
    name: 'object_uuid',
    type: 'varchar',
    length: 36,
    nullable: false,
  })
  objectUuid: string;

  @Column({
    name: 'extension',
    type: 'varchar',
    length: 10,
    nullable: false,
  })
  extension: string;

  @Column({
    name: 'error_detail',
    type: 'varchar',
    length: 200,
    nullable: false,
  })
  errorDetail: string;

  @ManyToOne(() => Item, (item) => item.itemImageUploadTasks)
  @JoinColumn({
    name: 'item_id',
    foreignKeyConstraintName: 'FK_item_image_upload_task_item_id',
  })
  item: Item;

  @ManyToOne(
    () => Classification,
    (classification) => classification.itemImageUploadTasks,
  )
  @JoinColumn({
    name: 'classification_id',
    foreignKeyConstraintName: 'FK_item_image_upload_task_classification_id',
  })
  classification: Classification;

  @OneToMany(() => ItemImage, (itemImage) => itemImage.itemImageUploadTask)
  itemImages: ItemImage[];
}
