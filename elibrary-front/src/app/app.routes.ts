import { Routes } from '@angular/router';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { ProfileComponent } from './components/profile/profile.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { AddBookComponent } from './components/add-book/add-book.component';
import { BookViewComponent } from './components/book-view/book-view.component';
import { BookGuard } from './guards/book.guard';

export const routes: Routes = [
    {
        path: '',
        component: MainPageComponent
    },
    {
        path: 'signin',
        component: SignInComponent
    },
    {
        path: 'signup',
        component: SignUpComponent
    },
    {
        path: 'profile',
        component: ProfileComponent
    },
    {
        path: 'add-book',
        component: AddBookComponent
    },
    {
        path: 'book',
        component: BookViewComponent,
        canActivate: [BookGuard()]
    },
    {
        path: '**',
        redirectTo: '/'
    }
];
