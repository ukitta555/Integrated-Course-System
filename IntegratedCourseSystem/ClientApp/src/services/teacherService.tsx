import axios from 'axios'
import {TeacherInfo} from '../store/types'

const baseURL = 'http://localhost:3001/teachers'
//const baseURL = '/api/teachers'

const createTeacher = async (teacherInfo: TeacherInfo) => {
  try {
    const response = await axios.post (
      baseURL,
      teacherInfo,
      {withCredentials: true}
    )
    return response.data
  }
  catch (error) {
    console.log (error)
  }
}
export default
{
  createTeacher
}