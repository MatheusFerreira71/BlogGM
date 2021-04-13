import { createReducer, on } from '@ngrx/store'
import { ReturnedUser } from '../sign-up-form/user.service'
import { setUser, toggleAuthState } from './actions';



export interface AuthState {
    user: ReturnedUser
    loggedIn: boolean
}

const INITIAL_STATE: AuthState = {
    user: null,
    loggedIn: false
}

const _authReducer = createReducer(
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

export function AuthReducer(state: AuthState, action: any): AuthState {
    return _authReducer(state, action)
}