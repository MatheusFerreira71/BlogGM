import { createReducer, on } from '@ngrx/store'
import { ReturnedUser } from '../sign-up-form/user.service'
import { setUser, setAuthState } from './actions';



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
    on(setAuthState, (state, { payload }) => ({
        ...state,
        loggedIn: payload
    }))
)

export function AuthReducer(state: AuthState, action: any): AuthState {
    return _authReducer(state, action)
}