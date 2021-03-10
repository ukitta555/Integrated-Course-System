import axios from "axios"
const baseURL = "/api/classRoles"
//const baseURL = "http://localhost:3001/courseRoles"


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
  addCourseRoles
}