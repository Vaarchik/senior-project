import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BookSearchComponent } from '../book-search/book-search.component';
import { BookListComponent } from '../book-list/book-list.component';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [
    CommonModule,
    BookSearchComponent,
    BookListComponent
  ],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss'
})
export class MainPageComponent {
}
