import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import BitTransformer from 'src/transformers/bit.transformer';

import { MemberDeliveryAddress } from './member-delivery-address.entity';
import { MemberRegistrationType } from '../enums/member-registration-type.enum';
import { MemberStatus } from '../enums/member-status.enum';

@Entity('member')
@Unique('AK_member_unique_identifier', ['uniqueIdentifier'])
@Unique('AK_member_member_number', ['memberNumber'])
export class Member {
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

  @Column({
    name: 'unique_identifier',
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  uniqueIdentifier: string;

  @Column({ name: 'member_number', type: 'char', length: 8, nullable: false })
  memberNumber: string;

  @Column({ name: 'email', type: 'varchar', length: 320, nullable: false })
  email: string;

  @Column({ name: 'registration_type', type: 'int', nullable: false })
  registrationType: MemberRegistrationType;

  @Column({ name: 'status', type: 'int', default: 1, nullable: false })
  status: MemberStatus;

  @Column({
    name: 'is_blacklisted',
    type: 'bit',
    width: 1,
    default: false,
    nullable: false,
    transformer: new BitTransformer(),
  })
  isBlacklisted: boolean;

  @Column({ name: 'memo', type: 'text', nullable: true })
  memo: string;

  @Column({
    name: 'is_deleted',
    type: 'bit',
    width: 1,
    default: false,
    nullable: false,
    transformer: new BitTransformer(),
  })
  isDeleted: boolean;

  @OneToMany(
    () => MemberDeliveryAddress,
    (MemberDeliveryAddress) => MemberDeliveryAddress.member,
  )
  memberDeliveryAddresses: MemberDeliveryAddress[];
}
