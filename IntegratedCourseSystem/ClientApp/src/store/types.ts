//constants
export const REGISTER_USER: 'REGISTER_USER' = 'REGISTER_USER'
export const LOGIN_USER: 'LOGIN_USER'  = 'LOGIN_USER'
export const UPDATE_USER_WITH_QUE_INFO : 'UPDATE_USER_WITH_QUE_INFO' = 'UPDATE_USER_WITH_QUE_INFO'
export const EMPTY_STRING: '' = ''
export const NO_ID: -1 = -1

//state interfaces

export type Role = "student" | "teacher" | "admin" | "user"

export interface UserState  {
  email: string,
  id: number,
  name: string | null,
  surname: string | null,
  role: Role
}

// service interfaces
export interface StudentInfo {
  name: string,
  surname: string,
  courseId: string,
  coursePassword: string
}

export interface TeacherInfo {
  name: string,
  surname: string,
  facultyId: number
}


// action types

type LoginUserAction = {
  type: typeof LOGIN_USER,
  userInfo: UserState
}

type UpdateUserWithQueInfoAction = {
  type: typeof UPDATE_USER_WITH_QUE_INFO,
  userInfo: {
    name: string,
    surname: string,
    role: Role
  }
}

export type registrationActionTypes = LoginUserAction | UpdateUserWithQueInfoAction
