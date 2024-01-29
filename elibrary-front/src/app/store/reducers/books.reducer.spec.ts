import { TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { initialBooksState, booksReducer, selectBook } from './books.reducer';
import { booksActions } from '../actions/books.actions';
import { Book } from '../../interfaces/book.interface';

const books: Book[] = [
    {
        id: 1,
        name: 'First book',
        content: 'Some long content',
        owner: {
            id: 1,
            email: 'some@email.com',
            token: '123123'
        }
    },
    {
        id: 2,
        name: 'Second book',
        content: 'Some long content',
        owner: {
            id: 2,
            email: 'some_other@email.com',
            token: '123123'
        }
    }
]

describe('Test book reducer', () => {

    it('Get books received', () => {
        const action = booksActions.getBooks();

        const state = booksReducer(initialBooksState, action);

        expect(state.isLoading).toEqual(true);
    });

    it('Get books success', () => {
        const getBooks = booksActions.getBooks();

        const afterGetBooksState = booksReducer(initialBooksState, getBooks);

        expect(afterGetBooksState).toEqual({
            ...initialBooksState,
            isLoading: true,
            books: []
        });

        const getBooksSuccess = booksActions.getBooksSuccess({books: books});

        const afterGetBooksSuccessState = booksReducer(afterGetBooksState, getBooksSuccess);

        expect(afterGetBooksSuccessState).toEqual({
            ...initialBooksState,
            isLoading: false,
            books
        })
    });

    it('After get books fail', () => {
        const getBooks = booksActions.getBooks();

        const afterGetBooksState = booksReducer(initialBooksState, getBooks);

        expect(afterGetBooksState).toEqual({
            ...initialBooksState,
            isLoading: true,
            books: []
        });

        const getBooksFail = booksActions.getBooksFail();

        const afterGetBooksFailState = booksReducer(afterGetBooksState, getBooksFail);

        expect(afterGetBooksFailState).toEqual({
            ...initialBooksState,
            isLoading: false
        });
    });
});