import axios from 'axios'
import {StudentInfo} from '../store/types'
//const baseURL = 'http://localhost:3001/students'
const baseURL = '/api/students'

const createStudent = async (studentInfo: StudentInfo) => {
  try {
    const response = await axios.post (
      baseURL,
      studentInfo,
      {withCredentials: true}
    )
    return response.data
  }
  catch (error){
    console.log(error.response.data)
  }
}

const getStudentsByClass = async (classId: number | null) => {
  try {
    if (!classId) return []
    const response = await axios.post(
      `${baseURL}/getStudentsByClass`,
      {classId},
      {withCredentials: true}
    )
    return response.data
  }
  catch (error){
    console.log(error.response.data)
    return []
  }
}

const getStudentById = async (studentId: number) => {
  try {
    const response = await axios.get(
      `${baseURL}/${studentId}`,
      {withCredentials: true}
    )
    return response.data
  }
  catch (error) {
    console.log (error.response.data)
    return null
  }
}

export default
{
  getStudentsByClass,
  getStudentById,
  createStudent
}