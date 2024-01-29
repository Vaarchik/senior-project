import { Body, Controller, Get, Post, Request } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dtos/create-book.dto';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { User } from 'src/users/user.entity';

@Controller('books')
export class BooksController {
    constructor(
        private booksService: BooksService
    ) {}

    @Get('')
    async getBooks() {
        const books = await this.booksService.getBooks();

        return {
            books
        }
    }

    @Post('')
    async addBook(@Body() body: CreateBookDto, @CurrentUser() user: User) {
        console.log('user', user);
        
        const book = await this.booksService.createBook(body, user);

        console.log('new books create', book);
        
        const books = await this.booksService.getBooks();

        return {
            books
        }
    }
}
