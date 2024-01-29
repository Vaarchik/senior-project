import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideState, provideStore } from '@ngrx/store';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideEffects } from '@ngrx/effects';
import { provideHttpClient } from '@angular/common/http';
import * as AuthEffect from './store/effects/auth.effect';
import * as UserEffect from './store/effects/user.effect';
import * as BooksEffect from './store/effects/books.effect';
import { authFeatureKey, authReducer } from './store/reducers/auth.reducer';
import { userFeatureKey, userReducer } from './store/reducers/user.reducer';
import { booksFeatureKey, booksReducer } from './store/reducers/books.reducer';
import { provideStoreDevtools } from '@ngrx/store-devtools';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideRouter(routes),
    provideStore(),
    provideState(authFeatureKey, authReducer),
    provideState(userFeatureKey, userReducer),
    provideState(booksFeatureKey, booksReducer),
    provideEffects([AuthEffect, UserEffect, BooksEffect]),
    provideAnimations(),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),
      autoPause: true
    })
  ]
};
