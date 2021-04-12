import { createReducer, on } from '@ngrx/store'
import { ReturnedUser } from '../sign-up-form/user.service'
import { setUser, toggleAuthState } from './actions';



export interface State {
    user: ReturnedUser
    loggedIn: boolean
}

const INITIAL_STATE: State = {
    user: null,
    loggedIn: false
}

const _userReducer = createReducer(
    INITIAL_STATE,
    on(setUser, (state, { payload }) => ({
        ...state,
        user: payload
    })),
    on(toggleAuthState, state => ({
        ...state,
        loggedIn: !state.loggedIn
    }))
)

export function UserReducer(state: State, action: any): State {
    return _userReducer(state, action)
}