import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity('item_numbering')
@Unique('AK_item_numbering_prefix', ['prefix'])
export class ItemNumbering {
  @PrimaryGeneratedColumn({ name: 'id', type: 'bigint' })
  id: number;

  @Column({ name: 'created_at', type: 'datetime', nullable: false })
  createdAt: Date;

  @Column({ name: 'created_by', type: 'varchar', nullable: false, length: 36 })
  createdBy: string;

  @Column({ name: 'modified_at', type: 'datetime', nullable: false })
  modifiedAt: Date;

  @Column({ name: 'modified_by', type: 'varchar', nullable: false, length: 36 })
  modifiedBy: string;

  @Column({ name: 'prefix', type: 'varchar', nullable: false, length: 200 })
  prefix: string;

  @Column({ name: 'number', type: 'int', nullable: false })
  number: number;
}
