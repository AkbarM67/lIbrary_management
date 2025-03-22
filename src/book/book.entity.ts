import { Loan } from 'src/loan/loan.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';


@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  code: string; 

  @Column()
  stock: number; 

  @OneToMany(() => Loan, (loan) => loan.book)
  loans: Loan[]; 
}
