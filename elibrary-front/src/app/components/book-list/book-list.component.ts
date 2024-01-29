import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectBooks } from '../../store/reducers/books.reducer';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Book } from '../../interfaces/book.interface';
import { booksActions } from '../../store/actions/books.actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule
  ],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.scss'
})
export class BookListComponent {
  books$ = this.store.select(selectBooks);

  constructor(
    private store: Store,
    private router: Router
  ) {}

  openBook(book: Book) {
    console.log(book);
    
    this.store.dispatch(booksActions.selectBook(book));
    this.router.navigateByUrl('/book');
  }
}
