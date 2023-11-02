import { MemberDeliveryAddress } from '../entities/member-delivery-address.entity';
import { Member } from '../entities/member.entity';
import { MemberStatus } from '../enums/member-status.enum';

export class MemberResponse {
  id: number;

  memberNumber: string;

  name: string;

  nameKana: string;

  email: string;

  phoneNumber: string;

  postalCode: string;

  prefectureCode: string;

  city: string;

  address: string;

  status: string;

  isBlacklisted: boolean;

  memo: string;

  createdAt: number;

  createdBy: string;

  modifiedAt: number;

  modifiedBy: string;

  constructor(member: Member, memberDeliveryAddress: MemberDeliveryAddress) {
    this.id = member.id;
    this.memberNumber = member.memberNumber;
    this.name =
      memberDeliveryAddress.lastName + ' ' + memberDeliveryAddress.firstName;
    this.nameKana =
      memberDeliveryAddress.lastNameKana +
      ' ' +
      memberDeliveryAddress.firstNameKana;
    this.email = member.email;
    this.phoneNumber = memberDeliveryAddress.phoneNumber;
    this.postalCode = memberDeliveryAddress.postalCode;
    this.prefectureCode = memberDeliveryAddress.prefectureCode;
    this.city = memberDeliveryAddress.city;
    this.address = memberDeliveryAddress.address;
    this.status = member.status === MemberStatus.JOIN ? 'JOIN' : 'WITHDRAWN';
    this.isBlacklisted = member.isBlacklisted;
    this.memo = member.memo;
    this.createdAt = member.createdAt.getTime();
    this.createdBy = member.createdBy;
    this.modifiedAt = member.modifiedAt.getTime();
    this.modifiedBy = member.modifiedBy;
  }
}

export class MemberSearchResponse {
  id: number;

  memberNumber: string;

  name: string;

  nameKana: string;

  email: string;

  phoneNumber: string;

  status: string;

  isBlacklisted: boolean;

  memo: string;

  constructor(member: Member, memberDeliveryAddresses: MemberDeliveryAddress) {
    this.id = member.id;
    this.memberNumber = member.memberNumber;
    this.name =
      memberDeliveryAddresses.lastName +
      ' ' +
      memberDeliveryAddresses.firstName;
    this.nameKana =
      memberDeliveryAddresses.lastNameKana +
      ' ' +
      memberDeliveryAddresses.firstNameKana;
    this.email = member.email;
    this.phoneNumber = memberDeliveryAddresses.phoneNumber;
    this.status = member.status === MemberStatus.JOIN ? 'JOIN' : 'WITHDRAWN';
    this.isBlacklisted = member.isBlacklisted;
    this.memo = member.memo;
  }
}

export class SearchBrandResponse {
  data: MemberSearchResponse[];

  totalPage: number;

  count: number;

  limit: number;

  constructor(
    data: MemberSearchResponse[],
    totalPage: number,
    count: number,
    limit: number,
  ) {
    this.data = data;
    this.totalPage = totalPage;
    this.count = count;
    this.limit = limit;
  }
}
