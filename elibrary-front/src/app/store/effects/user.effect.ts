import { inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { userActions } from "../actions/user.actions";
import { catchError, map, of, switchMap } from "rxjs";
import { jwtDecode } from "jwt-decode";
import { User } from "../../interfaces/user.interface";
import { UserService } from "../../services/user.service";

export const getCurrentUserEffect = createEffect((
    actions$ = inject(Actions),
    userService = inject(UserService),
) => actions$.pipe(
  ofType(userActions.getCurrentUser),
  switchMap(() =>
    userService.getCurrentUser().pipe(
      map(({access_token}) => {
        const { email, name, id } = jwtDecode(access_token) as User;
        return userActions.getCurrentUserSuccess({
          email,
          name,
          id,
          token: access_token
        });
      }),
      catchError(() =>
        of(userActions.getCurrentUserFail())
      )
    )
  )
), {functional: true});

export const updateUserDataEffect = createEffect((
  actions$ = inject(Actions),
  userService = inject(UserService),
) => actions$.pipe(
  ofType(userActions.updateUserData),
  switchMap((data) =>
    userService.updateUserData(data).pipe(
      map(({access_token}) => {
        const { email, name, id } = jwtDecode(access_token) as User;
        return userActions.updateUserDataSuccess({
          email,
          name,
          id,
          token: access_token
        });
      }),
      catchError(() =>
        of(userActions.updateUserDataFail())
      )
    )
  )
), {functional: true});