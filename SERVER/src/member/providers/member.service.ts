import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Member } from '../entities/member.entity';
import { Repository, SelectQueryBuilder } from 'typeorm';
import {
  MemberResponse,
  MemberSearchResponse,
  SearchBrandResponse,
} from '../responses/member.response';
import { MemberDeliveryAddressType } from '../enums/member-delivery-address-type.enum';
import { MemberSearchRequest } from '../requests/member.request';
import { UpdateMemberRequest } from '../requests/update-member.request';
import { MemberStatus } from '../enums/member-status.enum';

@Injectable()
export class MemberService {
  constructor(
    @InjectRepository(Member)
    private memberRepository: Repository<Member>,
  ) {}

  async search(query: MemberSearchRequest) {
    const {
      limit,
      page,
      sort,
      memberNumber,
      email,
      phoneNumber,
      name,
      nameKana,
      status,
    } = query;
    const skip = limit * (page - 1);
    const queryBuilder: SelectQueryBuilder<Member> = this.memberRepository
      .createQueryBuilder('member')
      .innerJoinAndSelect(
        'member.memberDeliveryAddresses',
        'member_delivery_address',
      );

    if (memberNumber) {
      queryBuilder.andWhere('member.memberNumber = :memberNumber', {
        memberNumber: memberNumber,
      });
    }

    if (email) {
      queryBuilder.andWhere('member.email LIKE :email', {
        email: `%${email}%`,
      });
    }

    if (phoneNumber) {
      queryBuilder.andWhere(
        'member_delivery_address.phoneNumber = :phoneNumber',
        { phoneNumber: phoneNumber },
      );
    }

    if (name) {
      queryBuilder.andWhere(
        'CONCAT(member_delivery_address.last_name," ",member_delivery_address.first_name) LIKE :name',
        { name: `%${name}%` },
      );
    }

    if (nameKana) {
      queryBuilder.andWhere(
        'CONCAT(member_delivery_address.last_name_kana," ",member_delivery_address.first_name_kana) LIKE :nameKana',
        { nameKana: `%${nameKana}%` },
      );
    }

    if (status) {
      queryBuilder.andWhere('member.status = :status', {
        status: status,
      });
    }

    const [members, count] = await queryBuilder
      .andWhere('member.isDeleted = :isDeleted', { isDeleted: false })
      .andWhere('member_delivery_address.type = :type', {
        type: MemberDeliveryAddressType.MY_ADDRESS,
      })
      .orderBy('member.createdAt', sort as 'ASC' | 'DESC')
      .take(limit)
      .skip(skip)
      .getManyAndCount();

    const membersResponse: MemberSearchResponse[] = members.map((member) => {
      return new MemberSearchResponse(
        member,
        member.memberDeliveryAddresses[0],
      );
    });

    const totalPage = Math.ceil(count / limit);
    return new SearchBrandResponse(membersResponse, totalPage, count, limit);
  }

  async getId(memberId: number): Promise<MemberResponse> {
    const member: Member = await this.memberRepository
      .createQueryBuilder('member')
      .innerJoinAndSelect(
        'member.memberDeliveryAddresses',
        'member_delivery_address',
      )
      .where('member.id = :memberId', { memberId })
      .andWhere('member_delivery_address.type = :type', {
        type: MemberDeliveryAddressType.MY_ADDRESS,
      })
      .andWhere('member.isDeleted = :isDeleted', { isDeleted: false })
      .getOne();

    if (!member) {
      throw new NotFoundException();
    }
    return new MemberResponse(member, member.memberDeliveryAddresses[0]);
  }

  async update(id: number, body: UpdateMemberRequest): Promise<MemberResponse> {
    const { status, isBlacklisted, memo } = body;

    // 3.1 Tìm kiếm thông tin hội viên với điều kiện tìm kiếm là parameter input
    const member = await this.memberRepository.findOne({
      where: { id, isDeleted: false },
    });
    if (!member) {
      throw new NotFoundException();
    }

    // 3.2 Trường hợp quay trở lại hội (đã rời hội →đang vào hội) thì thực hiện check có đang trong thời gian có thể thực hiện hay không.
    if (
      member.status === MemberStatus.WITHDRAWN &&
      status === MemberStatus.JOIN
    ) {
      const currentDate = new Date();
      const lastWeekDate = new Date(currentDate);
      lastWeekDate.setDate(lastWeekDate.getDate() - 7);
      if (member.modifiedAt < lastWeekDate) {
        throw new NotFoundException();
      }
    }

    // 4.1. Update thông tin hội viên theo nội dung parameter input.
    const memberUpdate = { ...member };
    memberUpdate.isBlacklisted = isBlacklisted;
    if (memo) {
      memberUpdate.memo = memo;
    }
    memberUpdate.status = status;
    await this.memberRepository.update({ id: id }, memberUpdate);

    // 6.1. Trả kết quả xử lý về nguồn gọi.
    return this.getId(id);
  }
}
