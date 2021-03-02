import {
  REGISTER_USER,
  LOGIN_USER,
  EMPTY_STRING,
  NO_ID,
  registrationActionTypes,
  UserState
} from '../../store/types'


const initialState: UserState = {email: EMPTY_STRING, id: NO_ID}

const userReducer = (state = initialState, action: registrationActionTypes) => {
  switch (action.type) {
    case REGISTER_USER: {
      console.log('register user!')
      console.log (action.email, action.password)
      return initialState
    }
    case LOGIN_USER: {
      console.log ('login user!')
      console.log (action.userInfo)
      return action.userInfo
    }
    default: {
      return initialState
    }
  }
}

export default userReducer