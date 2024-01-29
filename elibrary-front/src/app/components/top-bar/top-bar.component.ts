import { Component, OnInit } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Store } from '@ngrx/store';
import { User } from '../../interfaces/user.interface';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import {MatMenuModule} from '@angular/material/menu';
import { selectUser } from '../../store/reducers/user.reducer';

@Component({
  selector: 'app-top-bar',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatToolbarModule,
    MatMenuModule,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.scss'
})
export class TopBarComponent {
  public user$: Observable<User | null> = this.store.select(selectUser);

  constructor(private store: Store) {
    this.user$.subscribe(data => console.log(data))
  }
}
