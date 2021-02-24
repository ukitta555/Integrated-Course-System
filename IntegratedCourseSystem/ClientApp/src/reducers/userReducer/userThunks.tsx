// api calls
import userService from '../../services/userService'
import {RootState} from '../../store/configureStore'
import {Action} from 'redux'
import { ThunkAction } from 'redux-thunk'
import { createRegisterUserAction, loginUserAction} from './userActionCreators'

export const registerUser = (email: string, password: string) : ThunkAction<void, RootState, unknown, Action<string>> =>
  async dispatch => {
    const addedUser = await userService.registerUser({email, password, role: 1})
    dispatch(createRegisterUserAction(email, password))
  }

export const loginUser = (email: string, password: string) : ThunkAction<void, RootState, unknown, Action<string>> =>
  async dispatch => {
    const loginResponse = await userService.login ({email, password});
    console.log (loginResponse)
    dispatch(loginUserAction(email, password))
  }