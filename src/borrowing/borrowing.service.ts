import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Member } from '../member/member.entity'; // Import entity Member
import { Book } from '../book/book.entity'; // Import entity Book
import { Loan } from '../loan/loan.entity'; // Import entity Loan

@Injectable()
export class BorrowingService {
  constructor(
    @InjectRepository(Member)
    private readonly memberRepo: Repository<Member>,
    @InjectRepository(Book)
    private readonly bookRepo: Repository<Book>,
    @InjectRepository(Loan)
    private readonly loanRepo: Repository<Loan>,
  ) {}

  async borrowBook(memberCode: string, bookCode: string) {
    // Mencari member berdasarkan memberCode
    const member = await this.memberRepo.findOne({ where: { code: memberCode } });
    if (!member) {
      throw new BadRequestException('Member not found');
    }

    // Mencari buku berdasarkan bookCode
    const book = await this.bookRepo.findOne({ where: { code: bookCode } });
    if (!book || book.stock < 1) {
      throw new BadRequestException('Book not available');
    }

    // Kurangi stok buku
    book.stock -= 1;
    await this.bookRepo.save(book);

    // Catat peminjaman
    const loan = new Loan();
    loan.member = member;
    loan.book = book;
    loan.loanDate = new Date();
    await this.loanRepo.save(loan);

    return { message: 'Book borrowed successfully' };
  }
}
