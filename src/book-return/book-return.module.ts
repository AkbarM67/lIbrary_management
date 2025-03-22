import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Loan } from 'src/loan/loan.entity';
import { BookReturnService } from './book-return.service';
import { BookReturnController } from './book-return.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Loan])],
  providers: [BookReturnService],
  controllers: [BookReturnController],
})
export class BookReturnModule {}
