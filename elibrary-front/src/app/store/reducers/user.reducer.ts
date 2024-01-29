import { createFeature, createReducer, on } from "@ngrx/store"
import { UserState } from "../../interfaces/user-state.interface"
import { userActions } from "../actions/user.actions"

const initialUserState: UserState = {
    user: null,
    isLoading: false
}

const userFeature = createFeature({
    name: 'user',
    reducer: createReducer(
        initialUserState,
        on(userActions.userSignedIn, (state, user) => ({
            ...state,
            user,
            isLoading: false
        })),
        on(userActions.getCurrentUser, (state) => ({
            ...state,
            isLoading: true
        })),
        on(userActions.getCurrentUserSuccess, (state, user) => ({
            ...state,
            user,
            isLoading: false
        })),
        on(userActions.getCurrentUserFail, (state) => ({
            ...state,
            isLoading: false,
            user: null
        })),
        on(userActions.updateUserDataSuccess, (state, user) => ({
            ...state,
            user,
            isLoading: false
        }))
    )
});

export const {
    name: userFeatureKey,
    reducer: userReducer,
    selectIsLoading,
    selectUser
} = userFeature;