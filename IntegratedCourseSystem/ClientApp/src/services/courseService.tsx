import axios from "axios"
const baseURL = "/api/classes"
//const baseURL = "http://localhost:3001/classes"

const addCourse = async (courseInfo: {name: string, inviteCode: string, teacherId: number, maxCapacity: number}) => {
  try {
    const response = await axios.post (
      baseURL,
      courseInfo,
      {withCredentials: true}
    )
    return response.data
  }
  catch (error) {
    console.log (error.response.data)
    return {}
  }
}

const getCoursesForTeacher = async (id: number) => {
  try {
    const response = await axios.post (
      `${baseURL}/TeacherClasses`,
      id,
      {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        }
      }
    )
    return response.data
  }
  catch (error) {
    console.log(error.response.data)
    return null
  }
}

const getCourseByID = async (classId: number | null) => {
  try {
    if (!classId) return null
    const response = await axios.get (
      `${baseURL}/${classId}`,
      {
        withCredentials: true,
      }
    )
    return response.data
  }
  catch (error) {
    console.log(error.response.data)
    return null
  }
}


const patchCourseGroups = async (classId: number, value: boolean) => {
  try {
    const arrayWrapper = [{value: value, op: 'replace', path:'/areGroupsDefined'}]
    const response = await axios.patch (
      //`${baseURL}/${classId}`,
      `${baseURL}/${classId}`,
      arrayWrapper,
      {withCredentials: true}
    )
    return response.data
  }
  catch (error) {
    console.log(error.response.data)
  }
}


const runAlgo = async (classId: number) => {
  try {
    const response = await axios.post(
      //`${baseURL}/${classId}`,
      `${baseURL}/runAlgo`,
      {id: classId},
      {withCredentials: true}
    )
    return response.data
  }
  catch (error) {
    console.log(error.response.data)
  }
}

export default {
  addCourse,
  getCoursesForTeacher,
  getCourseByID,
  patchCourseGroups,
  runAlgo
}