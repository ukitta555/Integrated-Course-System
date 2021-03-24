import {
  LOGIN_USER,
  EMPTY_STRING,
  NO_ID,
  registrationActionTypes,
  UserState,
  UPDATE_USER_WITH_QUE_INFO,
  LOGOUT_USER,
  UPDATE_COURSE_REG_STATUS
} from '../../store/types'


const initialState: UserState  = {
  email: EMPTY_STRING,
  id: NO_ID,
  name: null,
  surname: null,
  role: null,
  currentCourseId: null,
  isRegFilledIn: null,
  isAuthLoading: true
}

const userReducer = (state = initialState, action: registrationActionTypes) => {
  switch (action.type) {
    case LOGIN_USER: {
      console.log (action.userInfo)
      return {...state , ...action.userInfo}
    }
    case UPDATE_USER_WITH_QUE_INFO: {
      return {...state, ...action.userInfo}
    }
    case LOGOUT_USER: {
      const newState = initialState
      newState.isAuthLoading = false
      return newState
    }
    case UPDATE_COURSE_REG_STATUS: {
      return {...state, isRegFilledIn: action.isRegFilledIn}
    }
    default: {
      return state
    }
  }
}

export default userReducer