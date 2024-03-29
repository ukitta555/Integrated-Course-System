
//constants
export const REGISTER_USER: 'REGISTER_USER' = 'REGISTER_USER'
export const LOGIN_USER: 'LOGIN_USER'  = 'LOGIN_USER'
export const LOGOUT_USER: 'LOGOUT_USER' = "LOGOUT_USER"
export const UPDATE_USER_WITH_QUE_INFO : 'UPDATE_USER_WITH_QUE_INFO' = 'UPDATE_USER_WITH_QUE_INFO'
export const UPDATE_COURSE_REG_STATUS: 'UPDATE_COURSE_REG_STATUS' = 'UPDATE_COURSE_REG_STATUS'
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

/// component interfaces / types

export enum TaskViewMode {
  taskPage,
  groupPage
}

export interface Comment {
  author: string,
  text: string,
  commentId: number
}

export interface Grades {
  grades: {
    maxGrade: number,
    actualGrade: number,
    classSubjectId: number,
    taskId: number,
    id: number
  },
  name: string
}

export interface TaskDTO {
  task:
  {
    id: number,
    groupId: number,
    name: string,
    taskDescription: string,
    deadLine: Date | null,
    posted: Date,
    authorName: string | null,
    done: Date | null,
    link: string | null
  },
  grades: Grades[],
  amountOfComments: number
}

export interface TaskType {
  id: number,
  groupId: number,
  name: string,
  authorName: string | null,
  taskDescription: string,
  deadLine: Date | null,
  posted: Date,
  done: Date | null,
  grades: Grades[],
  amountOfComments: number,
  link: string | null
}


export interface Group {
  id: number,
  name: string,
  classid: number,
  groupTeches: GroupTech[],
  groupMembers: Student[]
}

export interface GroupTech {
  id: number,
  groupid: number,
  techid: number,
  name: string
}


export interface GroupStudent {
  id: number,
  groupId: number,
  studentId: number,
  name: string,
  surname: string
}

export interface Class {
  id: number,
  name: string,
  teacherId: number,
  areGroupsDefined: boolean,
  maxCapacity: number,
  studentsRegistered: number
}

export interface ClassSubject {
  id: number,
  name: string
}

export interface ClassTech {
  id: number,
  name: string
}


export interface ClassRole {
  id: number,
  name: string
}

export interface SubjectPreference {
  id: number,
  name: string,
  isPreferred: boolean
}

export interface RolePreference {
  roleId: number,
  roleName: string,
  preferenceLevel: PreferenceLevel
}

export interface TechPreference {
  techId: number,
  techName: string,
  preferenceLevel: PreferenceLevel
}

export enum PreferenceLevel {
  Hate = -1,
  IDK = 0,
  Love = 1
}

export interface Student {
  id: number,
  name: string,
  surname: string
}

export interface MatchParamsId {
  id: string;
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

type UpdateCourseRegStatusAction = {
  type: typeof UPDATE_COURSE_REG_STATUS,
  isRegFilledIn: boolean
}

type LogoutUserAction = {
  type: typeof LOGOUT_USER
}

export type registrationActionTypes =
  LoginUserAction |
  UpdateUserWithQueInfoAction |
  LogoutUserAction |
  UpdateCourseRegStatusAction
