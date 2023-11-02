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

import { Member } from './member.entity';
import { MemberDeliveryAddressType } from '../enums/member-delivery-address-type.enum';

@Entity('member_delivery_address')
export class MemberDeliveryAddress {
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

  @Column({ name: 'member_id', type: 'bigint', nullable: false })
  memberId: number;

  @Column({ name: 'type', type: 'int', nullable: false })
  type: MemberDeliveryAddressType;

  @Column({ name: 'last_name', type: 'varchar', length: 255, nullable: false })
  lastName: string;

  @Column({ name: 'first_name', type: 'varchar', length: 255, nullable: false })
  firstName: string;

  @Column({
    name: 'last_name_kana',
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  lastNameKana: string;

  @Column({
    name: 'first_name_kana',
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  firstNameKana: string;

  @Column({ name: 'postal_code', type: 'char', length: 8, nullable: false })
  postalCode: string;

  @Column({ name: 'prefecture_code', type: 'char', length: 2, nullable: false })
  prefectureCode: string;

  @Column({ name: 'city', type: 'varchar', length: 100, nullable: false })
  city: string;

  @Column({ name: 'address', type: 'varchar', length: 200, nullable: false })
  address: string;

  @Column({
    name: 'phone_number',
    type: 'varchar',
    length: 11,
    nullable: false,
  })
  phoneNumber: string;

  @Column({
    name: 'is_default',
    type: 'bit',
    width: 1,
    default: false,
    nullable: false,
    transformer: new BitTransformer(),
  })
  isDefault: boolean;

  @ManyToOne(() => Member, (Member) => Member.memberDeliveryAddresses)
  @JoinColumn({
    name: 'member_id',
    foreignKeyConstraintName: 'FK_member_delivery_address_member_id',
  })
  member: Member;
}
