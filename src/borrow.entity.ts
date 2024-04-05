import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';
import { Book } from './book.entity';

@Entity()
export class Borrow {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.borrows)
  user: User;

  @ManyToOne(() => Book, book => book.borrows)
  book: Book;

  @Column()
  borrowDate: Date;

  @Column({ nullable: true })
  returnDate: Date;
}
