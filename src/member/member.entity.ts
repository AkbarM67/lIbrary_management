import { Loan } from 'src/loan/loan.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class Member {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  code: string;

  @Column({ default: false })
  penalized: boolean; 
  
  @OneToMany(() => Loan, (loan) => loan.member)
  loans: Loan[]; 
}
