import { Controller, Get, Param, Query, Put, Body } from '@nestjs/common';
import { MemberService } from '../providers/member.service';
import { ParseIntPipe } from '@nestjs/common';
import { MemberSearchRequest } from '../requests/member.request';
import { UpdateMemberRequest } from '../requests/update-member.request';

@Controller('/members')
export class MemberController {
  constructor(private memberService: MemberService) {}

  @Get()
  async search(@Query() query: MemberSearchRequest) {
    return await this.memberService.search(query);
  }

  @Get('/:id')
  async getId(@Param('id', ParseIntPipe) memberId: number) {
    return await this.memberService.getId(memberId);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateMemberRequest,
  ) {
    return await this.memberService.update(id, body);
  }
}
