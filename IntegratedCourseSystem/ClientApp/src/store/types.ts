//constants
export const REGISTER_USER: 'REGISTER_USER' = 'REGISTER_USER'
export const LOGIN_USER: 'LOGIN_USER' = 'LOGIN_USER'
export const EMPTY_STRING: '' = ''
export const NO_ID: -1 = -1

//state interfaces

export interface UserState  {
  email: string,
  id: number
}

// service interfaces
export interface StudentInfo {
  name: string,
  surname: string,
  courseId: string,
  coursePassword: string,
  teacherId: number,
  facultyId: number
}

export interface TeacherInfo {
  name: string,
  surname: string,
  facultyId: number
}


// action types

type LoginUserAction = {
  type: typeof LOGIN_USER,
  userInfo: {id: number, email: string}
}

export type registrationActionTypes = LoginUserAction
