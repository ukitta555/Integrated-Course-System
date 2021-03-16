import {
  LOGIN_USER,
  registrationActionTypes,
  UserState
} from '../../store/types'

export const loginUserAction = (userInfo: {id: number, email: string}) : registrationActionTypes => {
  const modifiedUserInfo : UserState = {
    ...userInfo,
    name: null,
    surname: null,
    role: "user"
  }
  return {
    type: LOGIN_USER,
    userInfo: modifiedUserInfo
  }
}
