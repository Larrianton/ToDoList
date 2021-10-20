import {setIsLoggedInAC} from "../features/Login/auth-reducer";
import {authAPI} from "../api/todolists-api";
import {Dispatch} from "redux";
import {handleServerAppError} from "../utils/error-utils";

const initialState: InitialStateType = {
    status: 'idle',
    error: null,
    isInitialized: false
}

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
        case 'APP/SET_IS_INITIALIZED' :
            return {...state, isInitialized: action.isInitialized}
        default:
            return {...state}
    }
}
export const initializeAppTC = () => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.me().then(res => {
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedInAC(true));
            dispatch(setAppStatusAC('succeeded'))
        }
        dispatch(setAppInitialized(true));
        dispatch(setAppStatusAC('succeeded'))
    })
}

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type InitialStateType = {
    status: RequestStatusType
    error: string | null
    isInitialized: boolean
}

export const setAppInitialized = (isInitialized: boolean) => ({type: 'APP/SET_IS_INITIALIZED', isInitialized} as const)
export const setAppErrorAC = (error: string | null) => ({type: 'APP/SET-ERROR', error} as const)
export const setAppStatusAC = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status} as const)

export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>
export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>
export type setAppInitializedActionType = ReturnType<typeof setAppInitialized>

type ActionsType =
    | SetAppErrorActionType
    | SetAppStatusActionType
    | setAppInitializedActionType
