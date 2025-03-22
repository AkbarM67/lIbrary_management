
import { BorrowingService } from './borrowing.service';
import { Borrowing } from './borrowing.entity';
import { Repository } from 'typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('BorrowingService', () => {
  let service: BorrowingService;
  let borrowingRepo: Repository<Borrowing>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BorrowingService,
        { provide: getRepositoryToken(Borrowing), useClass: Repository },
      ],
    }).compile();

    service = module.get<BorrowingService>(BorrowingService);
    borrowingRepo = module.get<Repository<Borrowing>>(getRepositoryToken(Borrowing));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
