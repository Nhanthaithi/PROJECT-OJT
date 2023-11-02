import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { ItemStandard } from './item-standard.entity';
import { Classification } from './classification.entity';
import { Sku } from './sku.entity';
import BitTransformer from 'src/transformers/bit.transformer';

@Entity('sku_classification')
@Unique('AK_sku_classification_sku_id_item_standard_id', [
  'skuId',
  'itemStandardId',
])
export class SkuClassification {
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

  @Column({ name: 'classification_id', type: 'bigint', nullable: false })
  classificationId: number;

  @Column({
    name: 'is_deleted',
    type: 'bit',
    width: 1,
    default: false,
    nullable: false,
    transformer: new BitTransformer(),
  })
  isDeleted: boolean;

  @Column({ name: 'sku_id', type: 'bigint', nullable: false })
  skuId: number;

  @Column({ name: 'item_standard_id', type: 'bigint', nullable: false })
  itemStandardId: number;

  //sku_classification => item_standard
  @ManyToOne(
    () => ItemStandard,
    (itemStandard) => itemStandard.skuClassifications,
  )
  @JoinColumn({
    name: 'item_standard_id',
    foreignKeyConstraintName: 'FK_sku_classification_item_standard_id',
  })
  itemStandard: ItemStandard;

  //sku_classification => classification
  @ManyToOne(
    () => Classification,
    (classification) => classification.skuClassifications,
  )
  @JoinColumn({
    name: 'classification_id',
    foreignKeyConstraintName: 'FK_sku_classification_classification_id',
  })
  classification: Classification;

  //sku_classification(0-n) => sku(1)
  @ManyToOne(() => Sku, (sku) => sku.skuClassifications)
  @JoinColumn({
    name: 'sku_id',
    foreignKeyConstraintName: 'FK_sku_classification_sku_id',
  })
  sku: Sku;
}
