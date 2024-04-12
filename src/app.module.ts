import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BooksModule } from './books/books.module';
import { UsersModule } from './users/users.module';
import { BorrowsModule } from './borrows/borrows.module';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';

const dbConfig = require("../ormconfig.json");

@Module({
  
  imports: [TypeOrmModule.forRoot(dbConfig), BooksModule, UsersModule, BorrowsModule, AuthModule],
  controllers: [AppController],
  providers: [AppService, AuthService],
})
export class AppModule {
  
}


