import { inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { booksActions } from "../actions/books.actions";
import { catchError, map, of, switchMap } from "rxjs";
import { BooksService } from "../../services/books.service";

export const getBooksEffect = createEffect((
    actions$ = inject(Actions),
    booksService = inject(BooksService),
) => actions$.pipe(
  ofType(booksActions.getBooks),
  switchMap(() =>
    booksService.getBooks().pipe(
      map((repsonse) => {
        return booksActions.getBooksSuccess(repsonse);
      }),
      catchError(() =>
        of(booksActions.getBooksFail())
      )
    )
  )
), {functional: true});

export const addBookEffect = createEffect((
    actions$ = inject(Actions),
    booksService = inject(BooksService),
) => actions$.pipe(
  ofType(booksActions.addBook),
  switchMap((book) =>
    booksService.addBook(book).pipe(
      map((repsonse) => {
        return booksActions.addBookSuccess(repsonse);
      }),
      catchError(() =>
        of(booksActions.addBookFail())
      )
    )
  )
), {functional: true});