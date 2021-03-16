import {
  LOGIN_USER,
  UPDATE_USER_WITH_QUE_INFO,
  registrationActionTypes,
  UserState,
  Role
} from '../../store/types'

export const loginUserAction = (userInfo: {id: number, email: string}) : registrationActionTypes => {
  const modifiedUserInfo : UserState = {
    ...userInfo,
    name: null,
    surname: null,
    role: "user",
    teacherId: null,
    facultyId: null
  }
  return {
    type: LOGIN_USER,
    userInfo: modifiedUserInfo
  }
}

export const updateUserWithQueInfo = (userInfo: {
  name: string,
  surname: string,
  role: Role,
  teacherId: number | null,
  facultyId: number | null
}) => {
  return {
    type: UPDATE_USER_WITH_QUE_INFO,
    userInfo
  }
}