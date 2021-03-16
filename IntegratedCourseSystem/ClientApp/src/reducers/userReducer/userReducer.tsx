import {
  LOGIN_USER,
  EMPTY_STRING,
  NO_ID,
  registrationActionTypes,
  UserState,
  UPDATE_USER_WITH_QUE_INFO
} from '../../store/types'


const initialState: UserState  = {
  email: EMPTY_STRING,
  id: NO_ID,
  name: null,
  surname: null,
  role: "user",
  teacherId: null,
  facultyId: null
}

const userReducer = (state = initialState, action: registrationActionTypes) => {
  switch (action.type) {
    case LOGIN_USER: {
      console.log ('login user!')
      console.log (action.userInfo)
      return action.userInfo
    }
    case UPDATE_USER_WITH_QUE_INFO: {
      return {...state, ...action.userInfo}
    }
    default: {
      return initialState
    }
  }
}

export default userReducer