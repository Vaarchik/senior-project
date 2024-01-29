import { createFeature, createReducer, on } from "@ngrx/store";
import { BooksState } from "../../interfaces/books-state.interface";
import { booksActions } from "../actions/books.actions";

export const initialBooksState: BooksState = {
    books: [],
    book: null,
    isLoading: false
}

export const booksFeature = createFeature({
    name: 'books',
    reducer: createReducer(
        initialBooksState,
        on(booksActions.getBooks, (state) => ({
            ...state,
            isLoading: true
        })),
        on(booksActions.getBooksSuccess, (state, data) => ({
            ...state,
            books: data.books,
            isLoading: false
        })),
        on(booksActions.getBooksFail, (state) => ({
            ...state,
            isLoading: false
        })),
        on(booksActions.addBook, (state) => ({
            ...state,
            isLoading: true
        })),
        on(booksActions.addBookSuccess, (state, data) => ({
            ...state,
            books: data.books,
            isLoading: false
        })),
        on(booksActions.addBookFail, (state) => ({
            ...state,
            isLoading: false
        })),
        on(booksActions.selectBook, (state, book) => ({
            ...state,
            book
        }))
    )
});

export const {
    name: booksFeatureKey,
    reducer: booksReducer,
    selectIsLoading,
    selectBooks,
    selectBook
} = booksFeature;