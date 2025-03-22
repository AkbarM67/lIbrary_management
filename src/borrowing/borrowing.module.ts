import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { Borrowing } from './borrowing.entity';
import { BorrowingController } from './borrowing.controller';
import { BorrowingService } from './borrowing.service';

@Module({
  imports: [TypeOrmModule.forFeature([Borrowing])],
  controllers: [BorrowingController],
  providers: [BorrowingService],
})
export class BorrowingModule {}
