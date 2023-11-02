import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { FileDownloadTaskStatus } from '../enums/file-download-task-status.enum';
import { FileDownloadTaskType } from '../enums/file-download-task-type.enum';

@Entity('file_download_task')
export class FileDownloadTask {
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

  @Column({ name: 'shop_id', type: 'bigint', nullable: false })
  shopId: number;

  @Column({ name: 'type', type: 'int', nullable: false })
  type: FileDownloadTaskType;

  @Column({ name: 'status', type: 'int', nullable: false })
  status: FileDownloadTaskStatus;

  @Column({ name: 'parameter', type: 'text', nullable: true })
  parameter: string;

  @Column({
    name: 'error_detail',
    type: 'varchar',
    length: 200,
    nullable: true,
  })
  errorDetail: string;
}
