import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Loan } from './loan/loan.entity';
import { BookReturnModule } from './book-return/book-return.module';
import { Member } from './member/member.entity';
import { Book } from './book/book.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Member, Loan, Book]),
    TypeOrmModule.forRoot({
      type: 'mysql', 
      host: 'localhost', 
      port: 3306, 
      username: 'root', 
      password: '', 
      database: 'library_management', 
      entities: [Member],
      autoLoadEntities: true, 
      synchronize: true, 
    }),
    BookReturnModule,
  ],
  
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
