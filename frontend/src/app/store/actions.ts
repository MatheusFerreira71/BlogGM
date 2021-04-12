import { createAction, props } from "@ngrx/store";
import { ReturnedUser } from '../sign-up-form/user.service'

export enum ActionTypes {
    SetUser = 'SetUser',
    ToggleAuthState = 'ToggleAuthState'
}

const { SetUser, ToggleAuthState } = ActionTypes

export const setUser = createAction(SetUser, props<{ payload: ReturnedUser }>())
export const toggleAuthState = createAction(ToggleAuthState);