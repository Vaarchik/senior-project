import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Store } from '@ngrx/store';
import { selectBook } from '../../store/reducers/books.reducer';
import { combineLatest, map } from 'rxjs';
import { selectUser } from '../../store/reducers/user.reducer';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-book-view',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './book-view.component.html',
  styleUrl: './book-view.component.scss'
})
export class BookViewComponent {
  public bookData = new FormGroup({
    name: new FormControl(''),
    content: new FormControl('')
  });

  public book$ = this.store.select(selectBook);

  public isOwner$ = combineLatest(
    this.book$,
    this.store.select(selectUser)
  ).pipe(
    map(([book, user]) => {
      if (!book || !user) {
        return false;
      }

      return book?.owner?.id === user.id;
    })
  )

  constructor(
    private store: Store
  ) {
    this.book$.subscribe((book) => {
      this.bookData.patchValue({
        name: book?.name,
        content: book?.content
      })
    })
  }

  submit() {
    console.log(111);
  }
}
