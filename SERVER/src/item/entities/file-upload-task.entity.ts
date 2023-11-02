import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { FileUploadTaskStatus } from '../enums/file-upload-task-status.enum';
import { FileUploadTaskType } from '../enums/file-upload-task-type.enum';

@Entity('file_upload_task')
export class FileUploadTask {
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
  type: FileUploadTaskType;

  @Column({ name: 'status', type: 'int', nullable: false })
  status: FileUploadTaskStatus;

  @Column({ name: 'file_name', type: 'varchar', length: 200, nullable: false })
  fileName: string;

  @Column({
    name: 'error_detail',
    type: 'varchar',
    length: 200,
    nullable: true,
  })
  errorDetail: string;
}
