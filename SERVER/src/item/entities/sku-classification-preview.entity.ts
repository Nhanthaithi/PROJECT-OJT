import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('sku_classification_preview')
export class SkuClassificationPreview {
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

  @Column({ name: 'sku_classification_id', type: 'bigint', nullable: true })
  skuClassificationId: number;

  @Column({ name: 'item_id', type: 'bigint', nullable: false })
  itemId: number;

  @Column({ name: 'sku_id', type: 'bigint', nullable: false })
  skuId: number;

  @Column({ name: 'item_standard_id', type: 'bigint', nullable: false })
  itemStandardId: number;

  @Column({ name: 'classification_id', type: 'bigint', nullable: false })
  classificationId: number;
}
