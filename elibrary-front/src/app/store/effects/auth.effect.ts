import { inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { AuthService } from "../../services/auth.service";
import { authActions } from "../actions/auth.actions";
import { catchError, map, of, switchMap, tap } from "rxjs";
import { Router } from "@angular/router";
import { jwtDecode } from "jwt-decode";
import { User } from "../../interfaces/user.interface";
import { userActions } from "../actions/user.actions";

export const signInEffect = createEffect((
    actions$ = inject(Actions),
    authService = inject(AuthService),
    router = inject(Router),
) => actions$.pipe(
  ofType(authActions.signin),
  switchMap(({email, password}) =>
    authService.signIn({email, password}).pipe(
      tap(() => authActions.userSignedInSuccess()),
      map(({access_token}) => {
        const { email, name, id } = jwtDecode(access_token) as User;
        return userActions.userSignedIn({
          email,
          name,
          id,
          token: access_token
        });
      }),
      tap(() => router.navigateByUrl('/')),
      catchError(() => {
        return of(authActions.userSignedInFail())
      })
    )
  )
), {functional: true});

export const signUpEffect = createEffect((
    actions$ = inject(Actions),
    authService = inject(AuthService),
    router = inject(Router)
) => actions$.pipe(
  ofType(authActions.signup),
  switchMap(({email, password}) =>
    authService.signUp({email, password}).pipe(
      tap(() => authActions.userSignedInSuccess()),
      map(({access_token}) => {
        const { email, name, id } = jwtDecode(access_token) as User;
        return userActions.userSignedIn({
          email,
          name,
          id,
          token: access_token
        });
      }),
      tap(() => router.navigateByUrl('/')),
      catchError(() => {
        return of(authActions.userSignedInFail())
      })
    )
  )
), {functional: true});