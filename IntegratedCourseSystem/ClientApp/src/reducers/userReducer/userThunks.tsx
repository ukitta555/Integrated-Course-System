import userService from '../../services/userService'
import teacherService from '../../services/teacherService'
import studentService from '../../services/studentService'
import courseService from '../../services/courseService'

import {RootState} from '../../store/configureStore'
import {Action} from 'redux'
import { ThunkAction } from 'redux-thunk'
import {StudentInfo, TeacherInfo, LoginType, NO_ID, EMPTY_STRING} from '../../store/types'

import { loginUserAction, logoutUser, updateUserWithQueInfo } from './userActionCreators'
import questionnaireService from '../../services/questionnaireService'
import subjectQuestionnaire from '../../services/subjectQuestionnaire'
import roleMapper from '../../misc/roleMapper'
import axios from "axios";

const baseURL = '/api/teachers'


export const registerUser = (email: string, password: string) : ThunkAction<void, RootState, unknown, Action<string>> =>
  async () => {
    try {
      const createdUser = await userService.registerUser({email, password, role: -1})
      console.log(createdUser)
    }
    catch (error) {
      console.log (error)
    }
  }

export const loginUser = (email: string, password: string, loginType: LoginType) : ThunkAction<void, RootState, unknown, Action<string>> =>
  async dispatch => {
      let loginResponse
      if (loginType === "manually") {
        loginResponse = await userService.login ({email, password})
      }
      else if (loginType === "onEnteringApp") {
        // undefined === error
        // null === not logged in (no cookies)
        // object === info about user
        loginResponse = await userService.loginInOnEnteringApp()
        console.log (loginResponse, typeof(loginResponse))
        // null returned by API (converted to empty string) or actually null
        if (loginResponse === '' || !loginResponse) {
          loginResponse = {
            email: EMPTY_STRING,
            id: NO_ID,
            name: null,
            surname: null,
            role: null,
            currentCourseId: null,
            isRegFilledIn: null,
            isAuthLoading: false,
          }
          dispatch(loginUserAction(loginResponse))
          return ;
        }
      }

      // set to false so that loading line won't show up again
      loginResponse.isAuthLoading = false

      // map int representation of roles to the corresponding string
      const stringRole = roleMapper(loginResponse.role)

      if (stringRole === "teacher") {
        const coursesForTeacher = await courseService.getCoursesForTeacher(loginResponse.id)
        const teacherCreatedCourse = coursesForTeacher.length > 0
        if (teacherCreatedCourse) {
          const currentCourseId = coursesForTeacher[0].id

          loginResponse.currentCourseId = currentCourseId // if there is a course in DB, we will redirect teacher to course page
          loginResponse.isRegFilledIn = null // N/A for teacher as they only fill in questionnaire
        }
      } else if (stringRole === "admin") {
          const coursesForTeacher = await courseService.getCoursesForTeacher(loginResponse.id)
          const teacherCreatedCourse = coursesForTeacher.length > 0
          if (teacherCreatedCourse) {
              const currentCourseId = coursesForTeacher[0].id

              loginResponse.currentCourseId = currentCourseId // if there is a course in DB, we will redirect teacher to course page
              loginResponse.isRegFilledIn = null // N/A for teacher as they only fill in questionnaire
          }
      } else if (stringRole === "student") {
        const queObjects = await questionnaireService.getQuestionnairesByStudent(loginResponse.id) // get que id by student id (at least one)
        console.log (`questionnaires for student ${loginResponse.id}`, queObjects)
        // queObjects[0] should always exist as it is created when the student entity is created
        const queSubjects = await subjectQuestionnaire.getSubjects(queObjects[0].id)
        console.log(queSubjects)
        const studentFilledReg = queSubjects.length > 0
        const currentCourseId = queObjects[0].classId
        // if student didn't fill in the course reg. form,
        // we will need this in order to know what course he had used before in questionnaire
        loginResponse.currentCourseId = currentCourseId
        if (studentFilledReg) {
          loginResponse.isRegFilledIn = true
        } else {
          loginResponse.isRegFilledIn = false
        }
      }
      loginResponse.role = stringRole
      if (loginResponse) {
        dispatch(loginUserAction(loginResponse))
      }
  }

export const logout = () : ThunkAction<void, RootState, unknown, Action<string>> =>
  async dispatch => {
    await userService.logout();
    dispatch(logoutUser());
  }

export const createTeacher = (teacherInfo: TeacherInfo) : ThunkAction<void, RootState, unknown, Action<string>> =>
  async (dispatch) => {
    try {
      const createdTeacher = await teacherService.createTeacher(teacherInfo)
      console.log(createdTeacher)
      dispatch (updateUserWithQueInfo({
        name: teacherInfo.name,
        surname: teacherInfo.surname,
        role: "teacher",
        currentCourseId: null,
        isRegFilledIn: null
      }))
    }
    catch (error) {
      console.log (error)
    }
  }

export const createStudent = (studentInfo: StudentInfo) : ThunkAction<void, RootState, unknown, Action<string>> =>
  async (dispatch) => {
    try {
      const createdStudent = await studentService.createStudent(studentInfo)
      console.log(createdStudent)
      dispatch (updateUserWithQueInfo({
        name: studentInfo.name,
        surname: studentInfo.surname,
        role: "student",
        currentCourseId: studentInfo.courseId,
        isRegFilledIn: null
      }))
    }
    catch (error) {
      console.log (error)
    }
  }

export const updateUserRole = (
  role: number,
  id: number)
  : ThunkAction<void, RootState, unknown, Action<string>> =>
  async () => {
    try {
      await userService.changeUser({value: role, op: "replace", path: "/role"}, id)
      //dispatch (updateUserWithQueInfo({}))
    }
    catch (error) {
      console.log (error.response.data)
    }
  }

export const updateTeacherStatus = (id: number, isVerified: boolean) => async () => {
    try {
        await axios.patch(
            `${baseURL}/verify`,
            {id, isVerified},
            {withCredentials: true}
        )
        //dispatch (updateUserWithQueInfo({}))
    }
    catch (error) {
        console.log (error.response.data)
    }
}