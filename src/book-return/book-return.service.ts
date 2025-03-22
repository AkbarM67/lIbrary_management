import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Loan } from 'src/loan/loan.entity';
import { Repository, IsNull } from 'typeorm';

@Injectable()
export class BookReturnService {
  constructor(
    @InjectRepository(Loan) private loanRepo: Repository<Loan>,
  ) {}

  // Fungsi untuk menghitung penalti berdasarkan keterlambatan
  private calculatePenalty(borrowedAt: Date, returnedAt: Date): number {
    const dueDays = 7; // Maksimal waktu pinjam 7 hari
    const penaltyPerDay = 5000; // Penalti Rp5.000 per hari keterlambatan

    const borrowedDate = new Date(borrowedAt);
    const returnDate = new Date(returnedAt);

    const diffTime = returnDate.getTime() - borrowedDate.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return diffDays > dueDays ? (diffDays - dueDays) * penaltyPerDay : 0;
  }

  // Fungsi untuk mengembalikan buku
  async returnBook(loanId: number) {
    const loan = await this.loanRepo.findOneBy({
      id: loanId,
      returnedAt: IsNull(), // Mencari buku yang belum dikembalikan
    });

    if (!loan) {
      throw new NotFoundException('Loan record not found or already returned.');
    }

    loan.returnedAt = new Date();
    loan.penalty = this.calculatePenalty(loan.loanDate, loan.returnedAt);

    await this.loanRepo.save(loan);

    return { message: 'Book returned successfully', loan };
  }
}
