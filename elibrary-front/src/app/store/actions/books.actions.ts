import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { BooksResponse } from "../../interfaces/books-response.interface";
import { Book } from "../../interfaces/book.interface";

export const booksActions = createActionGroup({
    source: 'books',
    events: {
        getBooks: emptyProps(),
        getBooksSuccess: props<BooksResponse>(),
        getBooksFail: emptyProps(),

        addBook: props<Book>(),
        addBookSuccess: props<BooksResponse>(),
        addBookFail: emptyProps(),

        selectBook: props<Book>()
    }
});
