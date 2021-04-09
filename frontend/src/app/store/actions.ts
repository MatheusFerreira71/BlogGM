import { createAction, props } from "@ngrx/store";
import { ReturnedUser } from '../sign-up-form/user.service'

export enum ActionTypes {
    SetUser = 'SetUser'
}

const { SetUser } = ActionTypes

export const setUser = createAction(SetUser, props<{ payload: ReturnedUser }>())