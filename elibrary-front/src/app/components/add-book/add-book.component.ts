import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { Store } from '@ngrx/store';
import { selectIsLoading } from '../../store/reducers/books.reducer';
import { booksActions } from '../../store/actions/books.actions';

@Component({
  selector: 'app-add-book',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './add-book.component.html',
  styleUrl: './add-book.component.scss'
})
export class AddBookComponent {
  public bookData = new FormGroup({
    name: new FormControl('', [Validators.required]),
    content: new FormControl('', [Validators.required])
  })

  public isLoading$ = this.store.select(selectIsLoading);

  constructor(
    private store: Store
  ) {}

  submit() {
    const {name, content} = this.bookData.getRawValue();
    this.store.dispatch(booksActions.addBook({
      name: name || '',
      content: content || ''
    }))
  }
}
