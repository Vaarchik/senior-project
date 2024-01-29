import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './book.entity';
import { Repository } from 'typeorm';
import { CreateBookDto } from './dtos/create-book.dto';
import { User } from 'src/users/user.entity';

@Injectable()
export class BooksService {
    constructor(
        @InjectRepository(Book) private repo: Repository<Book>,
    ) {
    }

    getBooks() {
        return this.repo.find({
            relations: {
                owner: true,
            },
        });
    }

    async createBook(newBook: CreateBookDto, user: User) {
        const book = await this.repo.create(newBook);
        book.owner = user;

        return this.repo.save(book);
    }
}
