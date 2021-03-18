import userService from '../../services/userService'
import teacherService from '../../services/teacherService'
import studentService from '../../services/studentService'
import courseService from '../../services/courseService'

import {RootState} from '../../store/configureStore'
import {Action} from 'redux'
import { ThunkAction } from 'redux-thunk'
import {StudentInfo, TeacherInfo} from '../../store/types'

import { loginUserAction, updateUserWithQueInfo } from './userActionCreators'
import questionnaireService from '../../services/questionnaireService'
import subjectQuestionnaire from '../../services/subjectQuestionnaire'


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

export const loginUser = (email: string, password: string) : ThunkAction<void, RootState, unknown, Action<string>> =>
  async dispatch => {
      let loginResponse = await userService.login ({email, password})

      const roleMap = new Map();
      roleMap.set(-1, "user");
      roleMap.set(0, "admin")
      roleMap.set(1, "teacher")
      roleMap.set(2, "student")
      const stringRole = roleMap.get(loginResponse.role)
      if (stringRole === "teacher") {
        const coursesForTeacher = await courseService.getCourses(loginResponse.id)
        const teacherCreatedCourse = coursesForTeacher.length > 0
        if (teacherCreatedCourse) {
          const currentCourseId = coursesForTeacher[0].id
          console.log (coursesForTeacher[0].id)
          loginResponse.currentCourseId = currentCourseId
          loginResponse.isRegFilledIn = null // N/A for teacher as they only fill in questionnaire
        }
      }
      else if (stringRole === "student") {
        const queObjects = await questionnaireService.getQuestionnaires(loginResponse.id) // get que id by student id (at least one)
        console.log (`questionnaires for student ${loginResponse.id}`, queObjects)
        // queObjects[0] should always exist as it is created when the student entity is created
        const queSubjects = await subjectQuestionnaire.getSubjects(queObjects[0].id)
        const studentFilledReg = queSubjects.length > 0
        const currentCourseId = queObjects[0].classId
        loginResponse.currentCourseId = currentCourseId
        if (studentFilledReg) {
          loginResponse.isRegFilledIn = true
        }
      }
      loginResponse.role = stringRole
      if (loginResponse) {
        dispatch(loginUserAction(loginResponse))
      }
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