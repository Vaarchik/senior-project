import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { authActions } from '../../store/actions/auth.actions';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { selectIsSubmiting } from '../../store/reducers/auth.reducer';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    RouterLink,
  ],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss'
})
export class SignInComponent {
  public email = '';
  public password = '';
  public invalidLogin = false;

  public isSubmiting$: Observable<boolean> = this.store.select(selectIsSubmiting);

  constructor(
    private store: Store
  ) {}

  onSubmit() {
    this.store.dispatch(authActions.signin({email: this.email, password: this.password}))
  }
}
