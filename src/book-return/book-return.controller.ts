import { Controller, Post, Param } from '@nestjs/common';
import { BookReturnService } from './book-return.service';

@Controller('book-return')
export class BookReturnController {
  constructor(private readonly bookReturnService: BookReturnService) {}

  @Post(':loanId')
  async returnBook(@Param('loanId') loanId: number) {
    return await this.bookReturnService.returnBook(loanId);
  }
}
