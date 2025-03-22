import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Member } from '../member/member.entity';
import { Book } from '../book/book.entity';

@Entity()
export class Borrowing {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Member)
  member!: Member;

  @ManyToOne(() => Book)
  book!: Book;

  @Column({ type: 'date' })
  borrowedAt: Date = new Date();

  @Column({ type: 'date', nullable: true })
  returnedAt?: Date;

  constructor(member: Member, book: Book) {
    this.member = member;
    this.book = book;
    this.borrowedAt = new Date();
  }
}
