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

const getCourses = async () => {
  try {
    const response = await axios.get (
      baseURL,
      {withCredentials: true}
    )
    console.log(response.data)
    return response.data
  }
  catch (error) {
    console.log(error.response.data)
    return null
  }
}



export default {
  addCourse,
  getCourses
}