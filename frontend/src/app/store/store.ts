import { createReducer, on } from '@ngrx/store'
import { ReturnedUser } from '../sign-up-form/user.service'
import { setUser } from './actions';



interface State {
    user: ReturnedUser
}

const INITIAL_STATE: State = {
    user: null
}

const _userReducer = createReducer(
    INITIAL_STATE,
    on(setUser, (state, { payload }) => ({
        ...state,
        user: payload
    }))
)

export function UserReducer(state: State, action: any): State {
    return _userReducer(state, action)
}