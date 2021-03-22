import axios from "axios"
const baseURL = "/api/classRoles"
//const baseURL = "http://localhost:3001/courseRoles"

const getCourseRoles = async (classId: number | null) => {
  try {
    if (!classId) return []
    const response = await axios.post(
      `${baseURL}/getByClass`,
      {classId},
      {withCredentials: true}
    )
    return response.data
  }
  catch (error) {
    console.log (error.request.data)
    return []
  }
}


const addCourseRoles = async (requestData: {roles: {id:number}[], courseId: number}) => {
  try {
    const modifiedRequest = requestData.roles.map (item => {
      return {
        roleId: item,
        classId: requestData.courseId
      }
    })

    const promisesArray = modifiedRequest.map (entity =>
      axios.post(
        baseURL,
        entity,
        {withCredentials: true}
      )
    )

    const response = await Promise.all(promisesArray)
    return response.map (r => r.data)
  }
  catch (error) {
    console.log (error.response.data)
    return []
  }
}



export default {
  getCourseRoles,
  addCourseRoles
}