// api calls
import userService from '../../services/userService'
import {RootState} from '../../store/configureStore'
import {Action} from 'redux'
import { ThunkAction } from 'redux-thunk'
import { createRegisterUserAction} from '../../reducers/userReducer/userActionCreators'

export const registerUser = (login: string, password: string, repeatPassword: string) : ThunkAction<void, RootState, unknown, Action<string>> => {
  return async dispatch => {
    if (password === repeatPassword) {
      const addedUser = await userService.registerUser({login, password, role: 1})
      dispatch(createRegisterUserAction(login, password, repeatPassword))
    }
    else {
      console.log ('passwords don\'t match!')
    }
  }
}