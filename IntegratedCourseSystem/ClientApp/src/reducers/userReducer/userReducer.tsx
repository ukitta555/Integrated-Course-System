import {
  REGISTER_USER,
  LOGIN_USER,
  registrationActionTypes
} from '../../store/types'

const initialState = null

const registrationReducer = (state = initialState, action: registrationActionTypes) => {
  switch (action.type) {
    case REGISTER_USER: {
      console.log('register user!')
      console.log (action.email, action.password, action.repeatPassword)
      return initialState
    }
    case LOGIN_USER: {
      console.log ('login user!')
      console.log (action.email, action.password)
      return initialState
    }
    default: {
      return initialState
    }
  }
}

export default registrationReducer