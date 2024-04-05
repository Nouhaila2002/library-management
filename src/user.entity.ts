import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Borrow } from './borrow.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Borrow, borrow => borrow.user)
  borrows: Borrow[];
}
