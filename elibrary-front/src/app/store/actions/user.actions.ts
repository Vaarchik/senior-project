import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { UpdateUser } from "../../interfaces/update-user.interface";
import { User } from "../../interfaces/user.interface";

export const userActions = createActionGroup({
    source: 'user',
    events: {
        userSignedIn: props<User>(),

        getCurrentUser: emptyProps(),
        getCurrentUserSuccess: props<User>(),
        getCurrentUserFail: emptyProps(),

        updateUserData: props<UpdateUser>(),
        updateUserDataSuccess: props<User>(),
        updateUserDataFail: emptyProps()
    }
});