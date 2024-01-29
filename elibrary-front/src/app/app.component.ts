import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TopBarComponent } from './components/top-bar/top-bar.component';
import { HttpClientModule } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { authActions } from './store/actions/auth.actions';
import { userActions } from './store/actions/user.actions';
import { booksActions } from './store/actions/books.actions';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    TopBarComponent,
    HttpClientModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  constructor(private store: Store) {
    this.store.dispatch(userActions.getCurrentUser());
    this.store.dispatch(booksActions.getBooks());
  }
}
