export const REGISTER_USER = 'REGISTER_USER'
export const LOGIN_USER = 'LOGIN_USER'

interface RegisterUserAction {
  type: typeof REGISTER_USER
  email: string,
  password: string,
  repeatPassword: string
}

interface LoginUserAction {
  type: typeof LOGIN_USER,
  email: string,
  password: string
}

export type registrationActionTypes = RegisterUserAction | LoginUserAction
