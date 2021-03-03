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

export default
{
  createStudent
}