import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { User } from '../../interfaces/user.interface';

export const authActions = createActionGroup({
  source: 'auth',
  events: {
    signin: props<{ email: string; password: string }>(),
    signup: props<{ email: string; password: string }>(),
    userSignedInSuccess: emptyProps(),
    userSignedInFail: emptyProps()
  }
});