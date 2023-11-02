import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Member } from './entities/member.entity';
import { MemberNumbering } from './entities/member-numbering.entity';
import { MemberDeliveryAddress } from './entities/member-delivery-address.entity';
import { MemberController } from './controllers/member.controller';
import { MemberService } from './providers/member.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Member, MemberNumbering, MemberDeliveryAddress]),
  ],
  controllers: [MemberController],
  providers: [MemberService],
})
export class MemberModule {}
