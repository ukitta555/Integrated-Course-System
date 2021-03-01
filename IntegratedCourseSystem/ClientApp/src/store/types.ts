export const REGISTER_USER: 'REGISTER_USER' = 'REGISTER_USER'
export const LOGIN_USER: 'LOGIN_USER' = 'LOGIN_USER'
export const EMPTY_STRING: '' = ''
export const NO_ID: -1 = -1



export interface UserState  {
  email: string,
  id: number
}

type RegisterUserAction = {
  type: typeof REGISTER_USER
  email: string,
  password: string
}

type LoginUserAction = {
  type: typeof LOGIN_USER,
  userInfo: {id: number, email: string}
}

export type registrationActionTypes = RegisterUserAction | LoginUserAction
