import { Body, Controller, Post } from '@nestjs/common';
import { BorrowingService } from './borrowing.service';

@Controller('borrowing')
export class BorrowingController {
  constructor(private readonly borrowingService: BorrowingService) {}

  @Post('borrow')
  async borrow(@Body() body: { memberCode: string; bookCode: string }) {
    return this.borrowingService.borrowBook(body.memberCode, body.bookCode);
  }
}
