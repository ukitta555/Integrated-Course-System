import {
  LOGIN_USER,
  UPDATE_USER_WITH_QUE_INFO,
  registrationActionTypes,
  UserState,
  Role,
  LOGOUT_USER
} from '../../store/types'

export const loginUserAction = (userInfo: UserState) : registrationActionTypes => {
  return {
    type: LOGIN_USER,
    userInfo: userInfo
  }
}

export const updateUserWithQueInfo = (userInfo: {
  name: string,
  surname: string,
  role: Role,
  currentCourseId: number | null,
  isRegFilledIn: boolean | null
}) => {
  return {
    type: UPDATE_USER_WITH_QUE_INFO,
    userInfo
  }
}

export const logoutUser = () => {
  return {
    type: LOGOUT_USER
  }
}