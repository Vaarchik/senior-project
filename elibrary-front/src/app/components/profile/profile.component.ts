import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { Store } from '@ngrx/store';
import { selectIsLoading, selectUser } from '../../store/reducers/user.reducer';
import { userActions } from '../../store/actions/user.actions';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatButtonModule
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  public isLoading$ = this.store.select(selectIsLoading);

  public userData = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    newPassword: new FormControl('')
  })

  constructor(private store: Store) {
    this.store.select(selectUser).subscribe((data) => {
      if (data) {
        this.userData.controls.name.setValue(data.name || '');
        this.userData.controls.email.setValue(data.email);
      }
    })
  }

  public submit() {
    this.store.dispatch(userActions.updateUserData(this.userData.getRawValue()));
  }
}
