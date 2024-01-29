import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { BooksResponse } from "../interfaces/books-response.interface";
import { Book } from "../interfaces/book.interface";

@Injectable({
    providedIn: 'root'
})
export class BooksService {
    private booksApi = 'api/books';

    constructor(
        private http: HttpClient
    ) {}

    getBooks(): Observable<BooksResponse> {
        return this.http.get<BooksResponse>(
            this.booksApi,
            {
                headers: new HttpHeaders({
                'Content-Type':  'application/json'
                })
            }
        )
    }

    addBook(book: Book) {
        return this.http.post<BooksResponse>(
            this.booksApi,
            book,
            {
                headers: new HttpHeaders({
                'Content-Type':  'application/json'
                })
            }
        );
    }
}