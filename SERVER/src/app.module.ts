import databaseConfig from './config/database.config';
import { ItemModule } from './item/item.module';
import { MemberModule } from './member/member.module';
import { StockModule } from './stock/stock.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    TypeOrmModule.forRoot(databaseConfig),
    MemberModule,
    StockModule,
    ItemModule,
  ],
})
export default class AppModule {}
