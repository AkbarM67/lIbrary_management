import { Book } from 'src/book/book.entity';
import { Member } from 'src/member/member.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';


@Entity()
export class Loan {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  bookTitle: string;

  @ManyToOne(() => Book, (book) => book.loans)
  book: Book; 


  @ManyToOne(() => Member, (member) => member.loans)
  member: Member;

  @Column({ nullable: true })
  loanDate: Date;

  @Column({ nullable: true })
  returnedAt: Date;

  @Column({ default: 0 })
  penalty: number;
}
