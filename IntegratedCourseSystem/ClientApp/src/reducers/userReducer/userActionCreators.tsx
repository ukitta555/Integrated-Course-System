import {
  LOGIN_USER,
  registrationActionTypes
} from '../../store/types'

export const loginUserAction = (userInfo: {id: number, email: string}) : registrationActionTypes => {
  return {
    type: LOGIN_USER,
    userInfo
  }
}
