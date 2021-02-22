import {
  REGISTER_USER,
  LOGIN_USER,
  registrationActionTypes
} from '../../store/types'

export const registerUserAction = (email: string, password: string, repeatPassword: string) : registrationActionTypes => {
  return {
    type: REGISTER_USER,
    email,
    password,
    repeatPassword
  }
}

export const loginUserAction = (email: string, password: string) : registrationActionTypes => {
  return {
    type: LOGIN_USER,
    email,
    password
  }
}
