import {
  REGISTER_USER,
  LOGIN_USER,
  registrationActionTypes
} from '../../store/types'

export const createRegisterUserAction = (email: string, password: string) : registrationActionTypes => {
  return {
    type: REGISTER_USER,
    email,
    password
  }
}

export const loginUserAction = (userInfo: {id: number, email: string}) : registrationActionTypes => {
  return {
    type: LOGIN_USER,
    userInfo
  }
}
