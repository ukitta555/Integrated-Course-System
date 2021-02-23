// api calls
import userService from '../../services/userService'
import {RootState} from '../../store/configureStore'
import {Action} from 'redux'
import { ThunkAction } from 'redux-thunk'
import { createRegisterUserAction, loginUserAction} from '../../reducers/userReducer/userActionCreators'

export const registerUser = (email: string, password: string, repeatPassword: string) : ThunkAction<void, RootState, unknown, Action<string>> => {
  return async dispatch => {
    if (password === repeatPassword) {
      const addedUser = await userService.registerUser({email, password, role: 1})
      dispatch(createRegisterUserAction(email, password, repeatPassword))
    }
    else {
      console.log ('passwords don\'t match!')
    }
  }
}

export const loginUser = (email: string, password: string) : ThunkAction<void, RootState, unknown, Action<string>> => {
  return async dispatch => {
    const loginResponse = await userService.login ({email, password});
    console.log (loginResponse)
    dispatch(loginUserAction(email, password))
  }
}