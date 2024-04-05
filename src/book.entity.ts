import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Borrow } from './borrow.entity';

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  author: string;

  @Column()
  publicationDate: Date;

  @Column({ default: true })
  isAvailable: boolean;

  @OneToMany(() => Borrow, borrow => borrow.book)
  borrows: Borrow[];
}
