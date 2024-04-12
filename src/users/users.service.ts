import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  findOne(id: number): Promise<User> {
    return this.userRepository.findOne({ where: { id: Number(id) } });
  }

  async create(user: User): Promise<User> {
    return this.userRepository.save(user);
  }

  async update(id: number, user: User): Promise<User> {
    await this.userRepository.update(id, user);
    return this.userRepository.findOne({ where: { id: Number(id) } });
  }

  async remove(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }

  async findOne2(username: string, password: string): Promise<User | undefined> {
    try {
      const user: User | undefined = await this.userRepository.findOne({ where: { name: username } });
      if (user) {
        // Here you would typically compare the hashed password stored in the database
        // with the hashed password provided by the user during login.
        // For security, it's recommended to use a secure password hashing algorithm like bcrypt.
        // For demonstration purposes, I'll assume plaintext comparison (not recommended in production).
        if (user.password === password) {
          return user; // User found and password matches
        }
      }
      return undefined; // User not found or password doesn't match
    } catch (error) {
      throw error; // Handle or log the error appropriately
    }
  }  
}
