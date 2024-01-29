import { Book } from "./book.interface";

export interface BooksState {
    books: Book[],
    isLoading: boolean,
    book: Book | null
}