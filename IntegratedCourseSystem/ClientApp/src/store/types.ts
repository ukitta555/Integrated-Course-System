import { logoutUser } from "../reducers/userReducer/userActionCreators"

//constants
export const REGISTER_USER: 'REGISTER_USER' = 'REGISTER_USER'
export const LOGIN_USER: 'LOGIN_USER'  = 'LOGIN_USER'
export const LOGOUT_USER: 'LOGOUT_USER' = "LOGOUT_USER"
export const UPDATE_USER_WITH_QUE_INFO : 'UPDATE_USER_WITH_QUE_INFO' = 'UPDATE_USER_WITH_QUE_INFO'
export const EMPTY_STRING: '' = ''
export const NO_ID: -1 = -1

//state interfaces

export type Role = "student" | "teacher" | "admin" | "user"
export type LoginType = "manually" | "onEnteringApp"

export interface UserState  {
  email: string,
  id: number,
  name: string | null,
  surname: string | null,
  role: Role | null,
  currentCourseId: number | null,
  isRegFilledIn: boolean | null,
  isAuthLoading: boolean
}

// service interfaces
export interface StudentInfo {
  name: string,
  surname: string,
  courseId: number,
  coursePassword: string,
  isRegFilledIn: boolean
}

export interface TeacherInfo {
  name: string,
  surname: string,
  facultyId: number
}


// action types

type LoginUserAction = {
  type: typeof LOGIN_USER,
  userInfo: {
    email: string,
    id: number,
    name: string | null,
    surname: string | null,
    role: Role | null,
    currentCourseId: number | null,
    isRegFilledIn: boolean | null
  }
}

type UpdateUserWithQueInfoAction = {
  type: typeof UPDATE_USER_WITH_QUE_INFO,
  userInfo: {
    name: string,
    surname: string,
    role: Role | null,
    currentCourseId: number | null,
    isRegFilledIn: boolean | null
  }
}

type LogoutUserAction = {
  type: typeof LOGOUT_USER
}

export type registrationActionTypes =
  LoginUserAction |
  UpdateUserWithQueInfoAction |
  LogoutUserAction
