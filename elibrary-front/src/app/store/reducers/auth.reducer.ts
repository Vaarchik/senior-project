import { createFeature, createReducer, on } from '@ngrx/store';
import { AuthState } from '../../interfaces/auth-state.interface';
import { authActions } from '../actions/auth.actions';

export const initialAuthState: AuthState = {
    isSubmiting: false,
    isLoading: false
};

const authFeature = createFeature({
    name: 'auth',
    reducer: createReducer(
        initialAuthState,
        on(authActions.signin, (state) => ({
            ...state,
            isSubmiting: true
        })),
        on(authActions.signup, (state) => ({
            ...state,
            isSubmiting: true
        })),
        on(authActions.userSignedInSuccess, (state) => ({
            ...state,
            isSubmiting: false
        })),
        on(authActions.userSignedInFail, (state) => ({
            ...state,
            isLoading: false,
            isSubmiting: false
        })),
    )
});

export const {
    name: authFeatureKey,
    reducer: authReducer,
    selectIsLoading,
    selectIsSubmiting
} = authFeature;