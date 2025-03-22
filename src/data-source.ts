import { DataSource } from 'typeorm';
import { Book } from './book/book.entity';
import { Member } from './member/member.entity';
import { Loan } from './loan/loan.entity';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',  // atau 127.0.0.1 jika localhost bermasalah
  port: 3306,
  username: 'root',
  password: '',  // Sesuaikan dengan password MySQL
  database: 'library_management',
  synchronize: false,  // Set false agar tidak menghapus data lama
  logging: true,
  entities: [Loan, Book],
  migrations: ['dist/migrations/*.js'],  // Pastikan folder sesuai
});

AppDataSource.initialize()
  .then(() => console.log('Data Source has been initialized!'))
  .catch((err) => console.error('Error during Data Source initialization', err));
